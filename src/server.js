const express=require('express');

//importamos las rutas del ejemplo
const inscripcionRoutes=require('./routes/inscripcion.routes.js');

//definimos el puerto donde escuchara nuestro servidor 
const PORT=3000;

// CREAMOS LA APLICACION DE EXPRESS

const app=express();

//conectamos las rutas a nuestra aplicacion
//todas las peticiones a /api/inscripciones seran manehjadas por inscripcionRoutes

app.use('/api/inscripciones',inscripcionRoutes);

//iniciamos el servidor
app.listen(PORT, function(){
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});