// Aplica logo o tema guardado (Sol ou Lua) antes de a página aparecer, para não piscar.
try {
  if (localStorage.getItem('tema') === 'lua') document.documentElement.setAttribute('data-tema', 'lua');
} catch (e) {}
