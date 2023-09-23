//
const express= require('express');
const router=express.Router();
const estudianteRepositorory= require('../repositories/EstudianteRepository');

//
router.get('/', async(request,response) =>{
    const lstEstudiantes=await estudianteRepositorory.obtenerTodosLosEstudiantes();
    console.log('listado: ', lstEstudiantes);

    response.send('bienvenido al laboratorio de IMPS');
});

module.exports=router;