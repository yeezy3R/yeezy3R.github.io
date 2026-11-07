// Textos extra (PT/EN) do CV e do formulário. Junta-se aos do main.js.
(function () {
  var g = [
      {
        pt: { btn_talk: "Falar comigo", btn_about: "Sobre mim", btn_cv: "Ver CV" },
        en: { btn_talk: "Get in touch", btn_about: "About me", btn_cv: "View CV" },
      },
      {
        pt: {
          btn_cv: "Ver CV",
          btn_talk: "Falar comigo",
          st1l: "a programar desde",
          st2l: "foco principal",
          st3n: "11.º ano",
          st3l: "Programação e Gestão de Sistemas Informáticos",
          title: "Diogo Ferreira — Sobre mim",
        },
        en: {
          btn_cv: "View CV",
          btn_talk: "Get in touch",
          st1l: "programming since",
          st2l: "main focus",
          st3n: "Grade 11",
          st3l: "Programming and IT Systems Management",
          title: "Diogo Ferreira — About me",
        },
      },
      {
        pt: {
          cv_view: "ver em:",
          cv_role: "Programador C# / .NET",
          cv_skills: "Competências",
          cv_edu: "Formação e percurso",
          title: "Diogo Ferreira — CV",
        },
        en: {
          cv_view: "view in:",
          cv_role: "C# / .NET Developer",
          cv_skills: "Skills",
          cv_edu: "Education and journey",
          title: "Diogo Ferreira — CV",
        },
      },
      {
        pt: {
          cv_role: "Programador C# / .NET",
          c_side: "// ou encontra-me aqui",
          c_title: "Vamos falar?",
          c_say: "// escreve-me uma mensagem",
          c_name: "Nome",
          c_email: "Email",
          c_subj: "Assunto",
          c_opt: "(opcional)",
          c_ph_subj: "Ex.: proposta de estágio",
          c_msg: "Mensagem",
          c_send: "Enviar mensagem",
          c_priv: "O teu nome, email e mensagem ficam guardados apenas para eu te poder responder.",
          c_ph_name: "O teu nome",
          c_ph_email: "o.teu@email.com",
          c_ph_msg: "Escreve aqui…",
          f_sending: "A enviar…",
          f_ok: "Mensagem enviada. Obrigado!",
          f_err: "Não foi possível enviar. Tenta outra vez ou fala comigo no LinkedIn.",
          f_demo: "O formulário ainda não está ligado à base de dados. Por agora, fala comigo pelo LinkedIn.",
          f_invalid: "Verifica o nome, o email, o assunto e a mensagem.",
          f_wait: "Espera uns segundos antes de enviar outra mensagem.",
          f_limit: "Já recebi várias mensagens tuas. Tenta outra vez mais tarde ou fala comigo no LinkedIn.",
          f_spam:
            "A mensagem parece spam (links a mais ou caracteres estranhos no nome ou no assunto). Revê e tenta outra vez.",
          title: "Diogo Ferreira — Contacto",
        },
        en: {
          cv_role: "C# / .NET Developer",
          c_side: "// or find me here",
          c_title: "Let's talk",
          c_say: "// send me a message",
          c_name: "Name",
          c_email: "Email",
          c_subj: "Subject",
          c_opt: "(optional)",
          c_ph_subj: "E.g. internship offer",
          c_msg: "Message",
          c_send: "Send message",
          c_priv: "Your name, email and message are stored only so I can reply to you.",
          c_ph_name: "Your name",
          c_ph_email: "your@email.com",
          c_ph_msg: "Write here…",
          f_sending: "Sending…",
          f_ok: "Message sent. Thank you!",
          f_err: "Could not send. Try again or message me on LinkedIn.",
          f_demo: "The form is not connected to the database yet. For now, message me on LinkedIn.",
          f_invalid: "Please check your name, email, subject and message.",
          f_wait: "Please wait a few seconds before sending another message.",
          f_limit:
            "I have already received several messages from you. Please try again later or message me on LinkedIn.",
          f_spam:
            "Your message looks like spam (too many links or odd characters in the name or subject). Please review it and try again.",
          title: "Diogo Ferreira — Contact",
        },
      },
    ],
    A = { pt: {}, en: {} };
  (g.forEach(function (I) {
    ["pt", "en"].forEach(function (C) {
      Object.assign(A[C], I[C] || {});
    });
  }),
    delete A.pt.title,
    delete A.en.title,
    Object.assign(A.pt, {
      cvfile: document.getElementById("cv").getAttribute("href"),
      n_home: "início",
      n_cv: "cv",
      cv_dl_t: "O meu CV",
    meteoro: "Mudar entre sol e lua",
    meteoro_dica: "clica e muda o céu",
      cv_dl_note: "PDF em português · muda para EN no topo para a versão inglesa",
    }),
    Object.assign(A.en, {
      cvfile: "cv-en.pdf",
      n_home: "home",
      n_cv: "cv",
      cv_dl_t: "My CV",
    meteoro: "Switch between sun and moon",
    meteoro_dica: "click to change the sky",
      cv_dl_note: "PDF in English · switch to PT at the top for the Portuguese version",
    }),
    (window.T_EXTRA = A));
})();
