// Botão do meteoro: um meteoro atravessa o ecrã e, no impacto, troca o tema Sol <-> Lua.
(function () {
  'use strict';
  var btn = document.getElementById('meteoro');
  if (!btn) return;
  var raiz = document.documentElement;
  var calmo = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var aCorrer = false;
  var cor = ''; // cor do meteoro (a do tema que ele traz), fixada no momento do clique

  function temaAtual() {
    return raiz.getAttribute('data-tema') === 'lua' ? 'lua' : 'sol';
  }
  function marcarBotao() {
    btn.setAttribute('aria-pressed', temaAtual() === 'lua' ? 'true' : 'false');
  }
  function trocarTema() {
    var novo = temaAtual() === 'lua' ? 'sol' : 'lua';
    if (novo === 'lua') raiz.setAttribute('data-tema', 'lua');
    else raiz.removeAttribute('data-tema');
    try {
      localStorage.setItem('tema', novo);
    } catch (e) {}
    marcarBotao();
    dispatchEvent(new Event('scroll')); // atualiza a cor do brilho que segue o rato
  }

  // cria um elemento, anima-o com a Web Animations API e apaga-o no fim
  function efeito(classe, x, y, frames, opts) {
    var el = document.createElement('div');
    el.className = classe;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.setProperty('--m', cor);
    document.body.appendChild(el);
    var a = el.animate(frames, opts);
    a.onfinish = function () {
      el.remove();
    };
    return a;
  }

  function impacto(x, y) {
    efeito('clarao', x, y, [{ opacity: 0.9, transform: 'scale(.2)' }, { opacity: 0, transform: 'scale(1.4)' }], {
      duration: 700,
      easing: 'ease-out',
    });
    efeito('impacto', x, y, [{ opacity: 1, transform: 'scale(.3)' }, { opacity: 0, transform: 'scale(9)' }], {
      duration: 800,
      easing: 'cubic-bezier(.2,.7,.2,1)',
    });
    for (var i = 0; i < 14; i++) {
      var ang = (i / 14) * Math.PI * 2 + Math.random() * 0.4;
      var dist = 60 + Math.random() * 110;
      efeito(
        'faisca',
        x,
        y,
        [
          { opacity: 1, transform: 'translate(0,0) scale(1)' },
          { opacity: 0, transform: 'translate(' + Math.cos(ang) * dist + 'px,' + Math.sin(ang) * dist + 'px) scale(.3)' },
        ],
        { duration: 600 + Math.random() * 400, easing: 'cubic-bezier(.1,.8,.3,1)' },
      );
    }
  }

  // a onda circular que muda o tema a partir do ponto de impacto
  function onda(x, y) {
    if (!document.startViewTransition || calmo) {
      trocarTema();
      return Promise.resolve();
    }
    var r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    var t = document.startViewTransition(trocarTema);
    t.ready.then(function () {
      raiz.animate(
        { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + r + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: 1000, easing: 'cubic-bezier(.3,.6,.2,1)', pseudoElement: '::view-transition-new(root)' },
      );
    });
    return t.finished;
  }

  btn.addEventListener('click', function () {
    if (aCorrer) return;
    if (calmo) {
      esconderDica(true);
      trocarTema();
      return;
    }
    aCorrer = true;
    esconderDica(true);
    btn.classList.remove('a-lancar');
    void btn.offsetWidth;
    btn.classList.add('a-lancar');
    cor = getComputedStyle(raiz).getPropertyValue('--lua-rgb').trim();
    btn.disabled = true;

    // o meteoro vem do canto de cima à direita e cai perto do centro do ecrã
    var alvo = { x: innerWidth * 0.5, y: innerHeight * 0.48 };
    var ini = { x: alvo.x + innerWidth * 0.6, y: alvo.y - innerHeight * 0.75 };
    var ang = (Math.atan2(alvo.y - ini.y, alvo.x - ini.x) * 180) / Math.PI;

    var m = document.createElement('div');
    m.className = 'meteoro';
    m.style.setProperty('--m', cor);
    m.innerHTML = '<span class="cauda"></span><span class="cabeca"></span>';
    document.body.appendChild(m);
    var rodar = ' rotate(' + ang + 'deg)';
    m.animate(
      [
        { transform: 'translate(' + ini.x + 'px,' + ini.y + 'px)' + rodar, opacity: 0 },
        { opacity: 1, offset: 0.15 },
        { transform: 'translate(' + alvo.x + 'px,' + alvo.y + 'px)' + rodar, opacity: 1 },
      ],
      { duration: 800, easing: 'cubic-bezier(.55,0,.85,.55)', fill: 'forwards' },
    );
    m.querySelector('.cauda').animate([{ transform: 'scaleX(.35)' }, { transform: 'scaleX(1)' }], {
      duration: 800,
      easing: 'ease-in',
      fill: 'forwards',
    });

    setTimeout(function () {
      m.remove();
      impacto(alvo.x, alvo.y);
      onda(alvo.x, alvo.y).then(fim, fim);
    }, 800);

    function fim() {
      aCorrer = false;
      btn.disabled = false;
    }
  });

  // balão "clica e muda o céu": aparece na primeira visita, até a pessoa clicar
  var visto = false;
  try {
    visto = localStorage.getItem('ceu-visto') === '1';
  } catch (e) {}
  var tDica;
  function esconderDica(guardar) {
    clearTimeout(tDica);
    btn.classList.remove('dica');
    if (guardar) {
      try {
        localStorage.setItem('ceu-visto', '1');
      } catch (e) {}
    }
  }
  if (!visto) {
    setTimeout(function () {
      btn.classList.add('dica');
      tDica = setTimeout(esconderDica, 7000);
    }, 2500);
  }

  marcarBotao();
})();
