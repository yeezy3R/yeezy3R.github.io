// Estrela do botão "Enviar mensagem": sai do botão ao enviar e explode em
// estrelinhas quando a mensagem chega. Se o envio falhar, volta ao botão.
// Ouve o evento "formulario-estado" que o js/formulario.js lança.
(function () {
  'use strict';
  var btn = document.getElementById('send');
  var ico = btn && btn.querySelector('.estrela-ico');
  if (!ico) return;
  var calmo = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var raiz = document.documentElement;
  var FORMA =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.75 5.82 6.37.78-4.69 4.38 1.2 6.3L12 17l-5.63 3.08 1.2-6.3L2.88 9.4l6.37-.78z"/></svg>';

  var voa = null; // a estrela que está no ar
  var subida = null; // promessa: termina quando a estrela acaba de subir
  var x = 0;
  var y = 0; // onde a estrela fica a brilhar
  var cor = '';
  var aExplodir = false;

  function centroIcone() {
    var r = ico.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }
  function pos(px, py, extra) {
    return 'translate(' + px + 'px,' + py + 'px)' + (extra || '');
  }
  function voltarIcone() {
    ico.classList.remove('fora');
    ico.classList.add('volta');
    setTimeout(function () {
      ico.classList.remove('volta');
    }, 600);
  }

  // 1) a estrela sai do botão e sobe
  function lancar() {
    if (voa) return subida;
    cor = getComputedStyle(raiz).getPropertyValue('--lua-rgb').trim();
    var c = centroIcone();
    x = c.x + Math.min(90, innerWidth * 0.12);
    y = Math.max(80, c.y - 170);
    voa = document.createElement('div');
    voa.className = 'estrela-voa';
    voa.innerHTML = FORMA;
    voa.style.setProperty('--m', cor);
    document.body.appendChild(voa);
    ico.classList.add('fora');
    subida = voa.animate(
      [
        { transform: pos(c.x, c.y, ' scale(.7) rotate(0deg)') },
        { transform: pos((c.x + x) / 2 + 40, (c.y + y) / 2 - 10, ' scale(1.35) rotate(220deg)'), offset: 0.6 },
        { transform: pos(x, y, ' scale(1.15) rotate(360deg)') },
      ],
      { duration: 800, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' },
    ).finished;
    return subida;
  }

  function efeito(classe, px, py, frames, opts) {
    var el = document.createElement('div');
    el.className = classe;
    el.style.left = px + 'px';
    el.style.top = py + 'px';
    el.style.setProperty('--m', cor);
    document.body.appendChild(el);
    el.animate(frames, opts).onfinish = function () {
      el.remove();
    };
  }

  // 2) a mensagem chegou: explode em estrelinhas
  function explodir() {
    if (aExplodir) return;
    aExplodir = true;
    lancar().then(function () {
      var px = x;
      var py = y;
      voa.remove();
      voa = null;
      efeito('estrela-clarao', px, py, [{ opacity: 1, transform: 'scale(.2)' }, { opacity: 0, transform: 'scale(1.3)' }], {
        duration: 650,
        easing: 'ease-out',
      });
      efeito('estrela-anel', px, py, [{ opacity: 1, transform: 'scale(.4)' }, { opacity: 0, transform: 'scale(9)' }], {
        duration: 800,
        easing: 'cubic-bezier(.2,.7,.2,1)',
      });
      var cores = ['#ffffff', 'rgb(' + cor + ')', 'rgb(' + cor + ')', '#fff1bf', '#cdd7ff'];
      for (var i = 0; i < 34; i++) {
        var ang = (i / 34) * Math.PI * 2 + Math.random() * 0.35;
        var dist = 80 + Math.random() * 190;
        var tam = 8 + Math.random() * 14;
        var dx = Math.cos(ang) * dist;
        var dy = Math.sin(ang) * dist;
        var rot = (Math.random() - 0.5) * 540;
        var el = document.createElement('div');
        el.className = 'estrelinha';
        el.innerHTML = FORMA;
        el.style.width = el.style.height = tam + 'px';
        el.style.marginLeft = el.style.marginTop = -tam / 2 + 'px';
        el.style.color = cores[i % cores.length];
        document.body.appendChild(el);
        el.animate(
          [
            { transform: pos(px, py, ' scale(.3) rotate(0deg)'), opacity: 1 },
            { transform: pos(px + dx, py + dy, ' scale(1) rotate(' + rot / 2 + 'deg)'), opacity: 1, offset: 0.45 },
            { transform: pos(px + dx * 1.1, py + dy * 1.1 + 60, ' scale(.2) rotate(' + rot + 'deg)'), opacity: 0 },
          ],
          { duration: 1100 + Math.random() * 700, easing: 'cubic-bezier(.15,.75,.35,1)', fill: 'forwards' },
        ).onfinish = (function (e) {
          return function () {
            e.remove();
          };
        })(el);
      }
      setTimeout(function () {
        voltarIcone();
        aExplodir = false;
      }, 700);
    });
  }

  // 3) correu mal: a estrela volta para o botão
  function cancelar() {
    if (!voa || aExplodir) return;
    subida.then(function () {
      if (!voa || aExplodir) return;
      var c = centroIcone();
      var v = voa;
      v.animate(
        [
          { transform: pos(x, y, ' scale(1.15)'), opacity: 1 },
          { transform: pos(c.x, c.y, ' scale(.4) rotate(-200deg)'), opacity: 0 },
        ],
        { duration: 550, easing: 'cubic-bezier(.5,0,.75,0)', fill: 'forwards' },
      ).onfinish = function () {
        v.remove();
        if (voa === v) voa = null;
        voltarIcone();
      };
    });
  }

  document.addEventListener('formulario-estado', function (e) {
    if (calmo) return;
    var d = e.detail || {};
    if (d.key === 'f_sending') lancar();
    else if (d.kind === 'ok') explodir();
    else cancelar();
  });
})();
