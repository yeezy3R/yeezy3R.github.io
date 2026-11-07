// Formulário de contacto: validação, proteção anti-spam e envio para o Supabase.
(function(){
  'use strict';
  var form=document.getElementById('form'); if(!form) return;
  var cfg=window.SUPABASE_CONFIG||{};
  var st=document.getElementById('fstatus'), btn=document.getElementById('send');
  var msg=form.elements.mensagem, count=document.getElementById('count');

  // ---- regras (o Supabase repete as mais importantes do lado do servidor) ----
  var COOLDOWN=30*1000;        // tempo mínimo entre duas mensagens
  var MAX_PER_HOUR=5;          // mensagens por hora a partir deste browser
  var MIN_FILL_MS=3000;        // humanos demoram mais de 3 s a preencher; robôs não
  var MAX_LINKS=3;             // mais links do que isto é quase sempre spam
  var openedAt=Date.now(), sending=false;

  function t(k){ return window.PF?window.PF.t(k):k; }
  function show(kind,key){
    st.className='fstatus '+kind; st.textContent=t(key);
    // avisa a animação da estrela do botão (js/estrela.js)
    document.dispatchEvent(new CustomEvent('formulario-estado',{detail:{kind:kind,key:key}}));
  }

  // tira caracteres de controlo e invisíveis (mantém mudanças de linha e tabs)
  function clean(s){
    return String(s||'').normalize('NFC')
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g,'')
      .trim();
  }
  function countLinks(s){ return (s.match(/https?:\/\/|www\./gi)||[]).length; }

  function history(){ try{ return JSON.parse(localStorage.getItem('sends')||'[]').filter(function(x){ return typeof x==='number'; }); }catch(_){ return []; } }
  function saveSend(){ try{ var h=history().filter(function(x){ return Date.now()-x<3600000; }); h.push(Date.now()); localStorage.setItem('sends',JSON.stringify(h)); }catch(_){} }

  msg.addEventListener('input',function(){ count.textContent=msg.value.length; });
  ['nome','email','assunto','mensagem'].forEach(function(n){
    form.elements[n].addEventListener('input',function(){ form.elements[n].closest('.field').classList.remove('bad'); });
  });

  function valid(v){
    var okName=v.nome.length>=1&&v.nome.length<=100&&!/[<>]/.test(v.nome)&&!/https?:\/\//i.test(v.nome);
    var okMail=/^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/.test(v.email)&&v.email.length<=200;
    var okSubj=v.assunto.length<=150&&!/[<>]/.test(v.assunto);
    var okMsg=v.mensagem.length>=2&&v.mensagem.length<=5000;
    form.elements.nome.closest('.field').classList.toggle('bad',!okName);
    form.elements.assunto.closest('.field').classList.toggle('bad',!okSubj);
    form.elements.email.closest('.field').classList.toggle('bad',!okMail);
    msg.closest('.field').classList.toggle('bad',!okMsg);
    return okName&&okMail&&okSubj&&okMsg;
  }

  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(sending) return;                                   // evita duplo clique
    var v={nome:clean(form.elements.nome.value),email:clean(form.elements.email.value).toLowerCase(),assunto:clean(form.elements.assunto.value).replace(/\s+/g,' '),mensagem:clean(msg.value)};
    if(!valid(v)){ show('err','f_invalid'); return; }

    // campo escondido: só os robôs o preenchem; finge sucesso e não envia nada
    if(form.elements.website.value){ show('ok','f_ok'); form.reset(); count.textContent='0'; return; }

    var h=history(), now=Date.now();
    if(h.length&&now-h[h.length-1]<COOLDOWN){ show('info','f_wait'); return; }
    if(h.filter(function(x){ return now-x<3600000; }).length>=MAX_PER_HOUR){ show('info','f_limit'); return; }
    if(countLinks(v.mensagem)>MAX_LINKS||countLinks(v.assunto)>0){ show('err','f_spam'); return; }

    // enviado menos de 3 s depois de abrir a página: é um robô; finge sucesso
    if(now-openedAt<MIN_FILL_MS){ show('ok','f_ok'); form.reset(); count.textContent='0'; return; }
    if(!cfg.url||!cfg.anonKey){ show('info','f_demo'); return; }

    // só aceita enviar para um endereço do Supabase em https
    var base=String(cfg.url).replace(/\/$/,''), table=String(cfg.table||'mensagens');
    if(!/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(base)||!/^[a-z_][a-z0-9_]*$/.test(table)){ show('err','f_err'); return; }

    sending=true; btn.disabled=true; show('info','f_sending');
    // chaves novas (sb_publishable_...) vão só no apikey; as antigas (JWT eyJ...) também no Authorization
    var hdrs={'apikey':cfg.anonKey,'Content-Type':'application/json','Prefer':'return=minimal'};
    if(/^eyJ/.test(cfg.anonKey)) hdrs['Authorization']='Bearer '+cfg.anonKey;
    var ctrl=('AbortController' in window)?new AbortController():null, timer=ctrl&&setTimeout(function(){ ctrl.abort(); },15000);

    fetch(base+'/rest/v1/'+table,{
      method:'POST', headers:hdrs, credentials:'omit', referrerPolicy:'no-referrer', cache:'no-store',
      signal:ctrl?ctrl.signal:undefined,
      body:JSON.stringify(v.assunto?{nome:v.nome,email:v.email,assunto:v.assunto,mensagem:v.mensagem}:{nome:v.nome,email:v.email,mensagem:v.mensagem})
    }).then(function(r){
      if(r.ok){ show('ok','f_ok'); form.reset(); count.textContent='0'; saveSend(); return; }
      // erros enviados pela proteção do Supabase (ver supabase-seguranca.sql)
      return r.json().catch(function(){ return {}; }).then(function(j){
        var m=String(j&&j.message||'');
        if(m.indexOf('limite_mensagens')>-1) show('info','f_limit');
        else if(m.indexOf('mensagem_spam')>-1) show('err','f_spam');
        else show('err','f_err');
      });
    }).catch(function(){ show('err','f_err'); })
      .then(function(){ sending=false; btn.disabled=false; if(timer) clearTimeout(timer); });
  });
})();
