// Ligação ao Supabase (projeto Portfolio). Tabela: mensagens_contacto — visitantes só podem inserir.
// Supabase → Project Settings → API:
//   url     = "Project URL"            (ex.: https://abcdxyz.supabase.co)
//   anonKey = "anon public" key        (é feita para ficar no site; NUNCA uses a service_role key aqui)
window.SUPABASE_CONFIG = {
  url: 'https://vgviflhmwsywtivqvzxc.supabase.co',
  anonKey: 'sb_publishable_L0KOvSVMWHYAoVS8gNE5ZA_9jy9wr6M',
  table: 'mensagens_contacto'
};
