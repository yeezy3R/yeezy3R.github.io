// Textos PT/EN, animações, olhos que seguem o rato, estrelas, scroll.
(function () {
  var u = matchMedia("(prefers-reduced-motion: reduce)").matches,
    N = matchMedia("(hover:hover) and (pointer:fine)").matches,
    V = document.documentElement,
    w = {
      pt: {
        n_home: "início",
        n_cv: "cv",
        n_sobre: "sobre",
        n_skills: "skills",
        n_proj: "projetos",
        n_perc: "percurso",
        n_cont: "contacto",
        status: "Disponível para estágio",
        h_sobre: "Sobre mim",
        s_sobre: "// quem está por trás do ecrã",
        about1:
          "Programo desde 2025. Gosto de criar apps que servem para alguma coisa, não código só por fazer. Web faço quando é preciso, mas o que mais me puxa é software e jogos.",
        about2:
          "Procuro um estágio numa empresa que precise de manter ou desenvolver software, onde possa mostrar o que já faço e crescer.",
        h_skills: "O que sei fazer",
        s_skills: "// duas constelações: o que se vê e o que o sustenta",
        sol_sub: "front-end e design",
        lua_sub: "código, dados e ferramentas",
        learning: "a aprender:",
        h_proj: "Projetos",
        s_proj: "// o que já brilha",
        p1: "Marketplace para comprar, vender e trocar produtos com anúncios, fotos e descrições. Projeto escolar em desenvolvimento, com a base já funcional e ligada a MongoDB. A STAP API recolhe e disponibiliza os dados que sustentam as funcionalidades.",
        p2: "App leve com jogos clássicos (Jogo do Galo e Ping-Pong), login com persistência em JSON e painel de administração.",
        p3: "Aplicação simples de gestão de stock para organizar o inventário de produtos, com ecrã de login para controlo de acesso.",
        h_perc: "Percurso",
        s_perc: '// do primeiro "hello world" até aqui',
        t1: "2026 – hoje",
        t1h: "11.º ano · Programação e Gestão de Sistemas Informáticos",
        t1p: "Curso profissional com estágio este ano e no próximo.",
        t2h: "O primeiro projeto",
        t2p: "Comecei por fazer um RPG de consola em C#/.NET.",
        falar: "// vamos falar?",
        cv: "Descarregar CV",
        btn_li: "Falar no LinkedIn",
        btn_gh: "Ver o meu GitHub",
        repo_stap: "Ver STAP",
        repo_api: "Ver STAP API",
        repo: "Ver no GitHub",
        repo_caos: "Ver Caos Programado",
        repo_nox: "Ver NOX",
        lines: ["programador. escrevo código de dia e de noite.", "apps que servem para alguma coisa."],
        hora: "hora aí: ",
        loc: "pt-PT",
        cvfile: "cv-pt.pdf",
        htmlLang: "pt-PT",
        title: "Diogo Ferreira — Programador C# / .NET",
      },
      en: {
        n_home: "home",
        n_cv: "cv",
        n_sobre: "about",
        n_skills: "skills",
        n_proj: "projects",
        n_perc: "journey",
        n_cont: "contact",
        status: "Open to an internship",
        h_sobre: "About me",
        s_sobre: "// who is behind the screen",
        about1:
          "I have been programming since 2025. I like building apps that actually do something, not code for the sake of it. I do web when needed, but software and games are what pull me most.",
        about2:
          "I am looking for an internship at a company that needs to maintain or build software, where I can show what I already do and grow.",
        h_skills: "What I can do",
        s_skills: "// two constellations: what you see and what holds it up",
        sol_sub: "front-end and design",
        lua_sub: "code, data and tools",
        learning: "learning:",
        h_proj: "Projects",
        s_proj: "// what already shines",
        p1: "Marketplace to buy, sell and swap products through listings with photos and descriptions. A school project still in development, with a working core connected to MongoDB. The STAP API collects and serves the data behind its features.",
        p2: "Lightweight arcade app with classic games (Tic-Tac-Toe and Ping-Pong), JSON-based login and an admin control panel.",
        p3: "Simple stock management app to organise product inventory, with a login screen for access control.",
        h_perc: "Journey",
        s_perc: '// from the first "hello world" until here',
        t1: "2026 – today",
        t1h: "Grade 11 · Programming and IT Systems Management",
        t1p: "Vocational course with an internship this year and next.",
        t2h: "The first project",
        t2p: "I started by making a console RPG in C#/.NET.",
        falar: "// let's talk?",
        cv: "Download CV",
        btn_li: "Message me on LinkedIn",
        btn_gh: "See my GitHub",
        repo_stap: "View STAP",
        repo_api: "View STAP API",
        repo: "View on GitHub",
        repo_caos: "View Caos Programado",
        repo_nox: "View NOX",
        lines: ["developer. i write code day and night.", "apps that actually do something."],
        hora: "your time: ",
        loc: "en-GB",
        cvfile: "cv-en.pdf",
        htmlLang: "en",
        title: "Diogo Ferreira — C# / .NET Developer",
      },
    },
    ue = window.T_EXTRA || {};
  ["pt", "en"].forEach(function (e) {
    Object.assign(w[e], ue[e] || {});
  });
  var m = "pt";
  try {
    var z = localStorage.getItem("lang");
    z === "pt" || z === "en" ? (m = z) : (navigator.language || "").slice(0, 2) !== "pt" && (m = "en");
  } catch (e) {}
  var G = document.getElementById("type"),
    T,
    A = 0,
    y = 0,
    x = !1,
    _;
  function M() {
    var e = T[A];
    if (((G.textContent = e.slice(0, y)), !x && y < e.length)) {
      (y++, (_ = setTimeout(M, 55)));
      return;
    }
    if (!x) {
      ((x = !0), (_ = setTimeout(M, 1800)));
      return;
    }
    if (y > 0) {
      (y--, (_ = setTimeout(M, 25)));
      return;
    }
    ((x = !1), (A = (A + 1) % T.length), (_ = setTimeout(M, 300)));
  }
  var R = document.getElementById("hora");
  function X() {
    R &&
      (R.textContent =
        w[m].hora + new Date().toLocaleTimeString(w[m].loc, { hour: "2-digit", minute: "2-digit" }));
  }
  function J(e, t) {
    m = e;
    var o = w[e];
    ((V.lang = o.htmlLang),
      (document.title = o.title),
      document.querySelectorAll("[data-i]").forEach(function (n) {
        o[n.dataset.i] !== void 0 && (n.textContent = o[n.dataset.i]);
      }),
      document.querySelectorAll("[data-al]").forEach(function (n) {
        o[n.dataset.al] !== void 0 && n.setAttribute("aria-label", o[n.dataset.al]);
      }),
      document.querySelectorAll("[data-ph]").forEach(function (n) {
        o[n.dataset.ph] !== void 0 && (n.placeholder = o[n.dataset.ph]);
      }));
    var r = document.getElementById("cv");
    if (
      (r && r.setAttribute("href", o.cvfile),
      r &&
        r.hasAttribute("download") &&
        r.setAttribute("download", "Diogo-Ferreira-CV-" + e.toUpperCase() + ".pdf"),
      document.querySelectorAll(".lang button").forEach(function (n) {
        n.setAttribute("aria-pressed", n.dataset.lang === e);
      }),
      t)
    )
      try {
        localStorage.setItem("lang", e);
      } catch (n) {}
    (clearTimeout(_),
      (T = o.lines),
      (A = 0),
      (y = 0),
      (x = !1),
      G && (u ? (G.textContent = T[0]) : M()),
      X());
  }
  (document.querySelectorAll(".lang button").forEach(function (e) {
    e.addEventListener("click", function () {
      J(e.dataset.lang, !0);
    });
  }),
    setInterval(X, 3e4),
    (window.PF = {
      t: function (e) {
        return w[m][e];
      },
      get lang() {
        return m;
      },
    }),
    J(m, !1),
    document.querySelectorAll("[data-stagger]").forEach(function (e) {
      [].forEach.call(e.children, function (t, o) {
        (t.classList.add("reveal"), (t.style.transitionDelay = o * 110 + "ms"));
      });
    }));
  var Y = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !u) {
    var U = new IntersectionObserver(
      function (e) {
        e.forEach(function (t) {
          t.isIntersecting && (t.target.classList.add("in"), U.unobserve(t.target));
        });
      },
      { threshold: 0.12 },
    );
    Y.forEach(function (e) {
      U.observe(e);
    });
  } else
    Y.forEach(function (e) {
      e.classList.add("in");
    });
  var P = {};
  if (
    (document.querySelectorAll("header nav a").forEach(function (e) {
      P[e.getAttribute("href").slice(1)] = e;
    }),
    "IntersectionObserver" in window)
  ) {
    var he = new IntersectionObserver(
      function (e) {
        e.forEach(function (t) {
          t.isIntersecting &&
            P[t.target.id] &&
            Object.keys(P).forEach(function (o) {
              P[o].classList.toggle("on", o === t.target.id);
            });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    Object.keys(P).forEach(function (e) {
      var t = document.getElementById(e);
      t && he.observe(t);
    });
  }
  ((function () {
    var e = document.querySelector("header"),
      t = document.querySelector("header nav");
    function o() {
      e && V.style.setProperty("--hh", Math.round(e.getBoundingClientRect().height) + "px");
    }
    (o(),
      addEventListener("resize", o),
      addEventListener("load", o),
      t &&
        "MutationObserver" in window &&
        new MutationObserver(function () {
          var r = t.querySelector("a.on");
          r &&
            t.scrollWidth > t.clientWidth &&
            t.scrollTo({
              left: r.offsetLeft - t.clientWidth / 2 + r.offsetWidth / 2,
              behavior: u ? "auto" : "smooth",
            });
        }).observe(t, { subtree: !0, attributes: !0, attributeFilter: ["class"] }));
  })(),
    document.querySelectorAll(".card").forEach(function (e) {
      e.addEventListener("pointermove", function (t) {
        var o = e.getBoundingClientRect();
        (e.style.setProperty("--mx", t.clientX - o.left + "px"),
          e.style.setProperty("--my", t.clientY - o.top + "px"));
      });
    }));
  var I = 0,
    K = 0,
    g = document.getElementById("glow"),
    Q = document.getElementById("eyes-sol");
  function W() {
    I = scrollY;
    var e = Math.max(1, document.documentElement.scrollHeight - innerHeight),
      t = Math.min(1, Math.max(0, I / e)),
      o = t.toFixed(4);
    ((K = +o),
      V.style.setProperty("--p", o),
      g &&
        g.style.setProperty(
          "--gc",
          V.getAttribute("data-tema") === "lua"
            ? Math.round(143 + 107 * t) + "," + Math.round(166 + 48 * t) + "," + Math.round(255 - 135 * t)
            : Math.round(242 - 99 * t) + "," + Math.round(193 - 27 * t) + "," + Math.round(78 + 177 * t),
        ),
      Q && !u && Q.style.setProperty("--py", (I * 0.18).toFixed(1) + "px"));
  }
  (addEventListener("scroll", W, { passive: !0 }), addEventListener("resize", W), W());
  var Z = [].slice.call(document.querySelectorAll(".iris")).map(function (e) {
      return { el: e, x: 0, y: 0 };
    }),
    c = null,
    $ = 0;
  (addEventListener(
    "pointermove",
    function (e) {
      ((c = { x: e.clientX, y: e.clientY }),
        ($ = performance.now()),
        N &&
          g &&
          ((g.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)"),
          (g.style.opacity = 1)));
    },
    { passive: !0 },
  ),
    document.addEventListener("pointerleave", function () {
      ((c = null), g && (g.style.opacity = 0));
    }));
  function ee(e) {
    var t = !c || e - $ > 4e3,
      o =
        !u && !t
          ? Z.map(function (r) {
              return r.el.getBoundingClientRect();
            })
          : null;
    (Z.forEach(function (r, n) {
      var l = 0,
        p = 0;
      if (!u)
        if (t) ((l = Math.sin(e / 2300 + n * 0.4) * 0.7), (p = Math.cos(e / 3100) * 0.35));
        else {
          var f = o[n],
            s = f.left + f.width / 2,
            b = f.top + f.height / 2,
            v = c.x - s,
            L = c.y - b,
            S = Math.hypot(v, L) || 1,
            k = Math.min(1, S / Math.max(160, innerWidth * 0.28));
          ((l = (v / S) * k), (p = (L / S) * k));
        }
      ((r.x += (l - r.x) * 0.12),
        (r.y += (p - r.y) * 0.12),
        r.el.style.setProperty("--dx", r.x.toFixed(3)),
        r.el.style.setProperty("--dy", r.y.toFixed(3)));
    }),
      requestAnimationFrame(ee));
  }
  requestAnimationFrame(ee);
  var D = document.getElementById("stars"),
    a = D.getContext("2d"),
    h,
    d,
    E,
    q = [],
    j = [],
    te = 2500;
  function oe() {
    ((E = Math.min(2, devicePixelRatio || 1)),
      (h = innerWidth),
      (d = innerHeight),
      (D.width = h * E),
      (D.height = d * E),
      a.setTransform(E, 0, 0, E, 0, 0));
    var e = Math.min(520, Math.round((h * d) / 3600));
    q = [];
    for (var t = 0; t < e; t++) {
      var o = Math.random(),
        r = Math.random() < 0.11,
        n = r ? Math.random() * 1.3 + 1.4 : Math.random() * 1.1 + 0.25,
        l = Math.random();
      q.push({
        x: Math.random() * h,
        y: Math.random() * d,
        r: n,
        z: 0.04 + o * o * 0.55,
        p: Math.random() * 6.28,
        s: Math.random() * 1.6 + 0.4,
        big: r,
        k: l < 0.38 ? "g" : l < 0.78 ? "b" : "w",
        px: 0,
        py: 0,
      });
    }
  }
  (addEventListener("resize", oe), oe());
  var pe = { g: "242,193,78", b: "143,166,255", w: "255,255,255" };
  // tema Lua: as estrelas douradas ficam azuis e as azuis ficam douradas (dourado claro)
  var peLua = { g: "143,166,255", b: "250,214,120", w: "255,255,255" };
  function me(e, t, o, r, n) {
    ((a.fillStyle = "rgba(" + n + "," + r + ")"),
      a.beginPath(),
      a.arc(e, t, o * 0.55, 0, 6.283),
      a.fill(),
      (a.strokeStyle = "rgba(" + n + "," + r * 0.8 + ")"),
      (a.lineWidth = 0.9));
    var l = o * 4.2;
    (a.beginPath(),
      a.moveTo(e - l, t),
      a.lineTo(e + l, t),
      a.moveTo(e, t - l),
      a.lineTo(e, t + l),
      a.stroke());
  }
  function ae(e) {
    var TL = V.getAttribute("data-tema") === "lua";
    a.clearRect(0, 0, h, d);
    for (
      var t = K,
        o = 1 - 0.55 * t,
        r = 0.5 + 0.5 * t,
        n = c ? c.x - h / 2 : 0,
        l = c ? c.y - d / 2 : 0,
        p = [],
        f = 0;
      f < q.length;
      f++
    ) {
      var s = q[f],
        b = s.x + (u ? 0 : -n * s.z * 0.03),
        v = ((((s.y - I * s.z) % d) + d) % d) + (u ? 0 : -l * s.z * 0.03);
      ((s.px = b), (s.py = v));
      var L = u ? 0.6 : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin((e / 1e3) * s.s + s.p)),
        S = s.k === "g" ? o : s.k === "b" ? r : 0.85,
        k = (L * S * (s.big ? 1 : 0.85)).toFixed(2),
        re = (TL ? peLua : pe)[s.k];
      if (
        (s.big
          ? me(b, v, s.r, k, re)
          : ((a.fillStyle = "rgba(" + re + "," + k + ")"),
            a.beginPath(),
            a.arc(b, v, s.r, 0, 6.283),
            a.fill()),
        c && N)
      ) {
        var ne = b - c.x,
          ie = v - c.y;
        ne * ne + ie * ie < 18e3 && p.push(s);
      }
    }
    if (p.length > 1) {
      a.lineWidth = 0.8;
      for (var C = 0; C < p.length; C++)
        for (var B = C + 1; B < p.length; B++) {
          var F = p[C],
            O = p[B],
            se = F.px - O.px,
            le = F.py - O.py,
            ce = se * se + le * le;
          if (ce < 9e3) {
            var fe = (1 - ce / 9e3) * 0.55;
            ((a.strokeStyle =
              "rgba(" +
              (t < 0.5 ? (TL ? "143,166,255" : "242,193,78") : TL ? "250,214,120" : "143,166,255") +
              "," +
              fe.toFixed(2) +
              ")"),
              a.beginPath(),
              a.moveTo(F.px, F.py),
              a.lineTo(O.px, O.py),
              a.stroke());
          }
        }
    }
    if (!u) {
      if (e > te && j.length < 2) {
        var de = Math.random() < 0.5;
        (j.push({
          x: de ? Math.random() * h * 0.5 + h * 0.5 : Math.random() * h * 0.5,
          y: Math.random() * d * 0.45,
          vx: (de ? -1 : 1) * (6 + Math.random() * 5),
          vy: 2.5 + Math.random() * 3,
          life: 1,
          k: Math.random() < 0.5 ? (TL ? "250,214,120" : "242,193,78") : "160,185,255",
        }),
          (te = e + 4500 + Math.random() * 7e3));
      }
      j = j.filter(function (i) {
        var H = a.createLinearGradient(i.x, i.y, i.x - i.vx * 11, i.y - i.vy * 11);
        return (
          H.addColorStop(0, "rgba(" + i.k + "," + i.life.toFixed(2) + ")"),
          H.addColorStop(1, "rgba(" + i.k + ",0)"),
          (a.strokeStyle = H),
          (a.lineWidth = 1.8),
          a.beginPath(),
          a.moveTo(i.x, i.y),
          a.lineTo(i.x - i.vx * 11, i.y - i.vy * 11),
          a.stroke(),
          (i.x += i.vx),
          (i.y += i.vy),
          (i.life -= 0.011),
          i.life > 0 && i.x > -80 && i.x < h + 80 && i.y < d + 80
        );
      });
    }
    requestAnimationFrame(ae);
  }
  requestAnimationFrame(ae);
})();
