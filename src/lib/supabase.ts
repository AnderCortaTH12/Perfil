import { createClient } from '@supabase/supabase-js';

// Cliente de Supabase para el navegador. Usa claves PUBLIC_* que Vite inyecta
// en el bundle de cliente durante el build (ver .env / .env.example y el
// workflow de GitHub Actions). Solo se importa desde scripts de cliente.
const url = import.meta.env.PUBLIC_SUPABASE_URL;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(url, anonKey);

/** Nombre de la tabla donde se registran los boosts. */
export const BOOSTS_TABLE = 'boosts';
