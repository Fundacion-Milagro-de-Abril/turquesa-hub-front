/* Entorno de PRODUCCIÓN · tools/build.js lo copia a dist/js/env.js.
   Backend: Supabase (Auth + PostgreSQL con RLS). La URL y la clave *publishable* son PÚBLICAS por diseño:
   no dan acceso por sí solas, la seguridad la imponen las políticas de la base de datos (RLS).
   NUNCA poner aquí la clave secreta (sb_secret_...) ni la service_role. */
window.TH_ENV = {
  entorno: 'produccion',
  version: '1.0.0-rc4',
  apiBase: '/api/v1',   // API HTTP de rc4: solo la usa el adaptador 'http' (pruebas); con Supabase no se usa
  supabaseUrl: 'https://xfifkecattmqadvqrfod.supabase.co',
  supabaseKey: 'sb_publishable_Ef3jRL7G9V95hMpzcb-W4A_KYFc5Xd-'
};
