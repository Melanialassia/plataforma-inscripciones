const express=require('express');
const router=express.Router();
const inscripcionController=require('../controllers/inscripcion.controller.js');


//get /api/inscripciones/
router.get('/',inscripcionController.obtenerInscripciones);

//get /api/inscripciones/:id
router.get('/:id',inscripcionController.obtenerInscripcionPorId);

module.exports=router;