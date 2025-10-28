// supabaseClient.js
const { createClient } = require('@supabase/supabase-js');

// Reemplazá estos valores con los que sacaste de tu proyecto Supabase
const supabaseUrl = 'https://qbbxoavmgkgputkuvqkd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiYnhvYXZtZ2tncHV0a3V2cWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNzY5MDcsImV4cCI6MjA3NjY1MjkwN30.rCDOeEjcuNAqfLZCesVzsX5rnNrPYZIkyFRLskU4Qdg';

// Creamos el cliente que luego usarán todos los services
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
