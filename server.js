const express = require('express');
const cors = require('cors');
const inscripcionRoutes = require('./src/routes/inscripcion.routes.js');
const authRoutes = require('./src/routes/auth.routes.js');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ strict: false }));

app.use('/api/inscripciones', inscripcionRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Servidor funcionando 🚀'));

app.listen(PORT, () => console.log(`✅ Servidor en http://localhost:${PORT}`));
