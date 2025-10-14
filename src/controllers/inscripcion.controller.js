

function obtenerInscripciones(req, res) {
    res.json([
        {id:1,nombre:"inscripcion de prueba1"},
        {id:2,nombre:"inscripcion de prueba2"}]);
}

function obtenerInscripcionPorId(req, res) {
    const id = parseInt(req.params.id); // convertir a número
    res.json({id:id,nombre:`inscripcion de prueba con id ${id}`});
}
module.exports = {
    obtenerInscripciones,
    obtenerInscripcionPorId
};
