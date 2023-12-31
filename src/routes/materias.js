const express = require('express');
const router = express.Router();
const queries = require('../repositories/MateriaRepository');
const { isLoggedIn } = require('../lib/auth');


// Endpoint para mostrar todas las materias
router.get('/', isLoggedIn, async (request, response) => {
    const materias = await queries.obtenerTodasLasMaterias();

     response.render('materias/listado', {materias: materias}); // Mostramos el listado de materias
});

// Endpoint que permite mostrar el formulario para agregar una nueva materias
router.get('/agregar', isLoggedIn, async(request, response) => {
   
    // Renderizamos el formulario
    response.render('materias/agregar');
});

// Endpoint que permite mostrar el formulario para modificar una materias
router.get('/modificar/:idmateria', isLoggedIn, async(request, response) => {
    const {idmateria} = request.params;

    // Aca es de obtener el objeto de  la materias
    const materia = await queries.obtenerMateriaPorID(idmateria)

    response.render('materias/actualizar',{idmateria, materia});
});


// Enpoint que permite realizar la modificacion de una materias
router.post('/modificar/:id', isLoggedIn, async(request, response) => {
    const { id } = request.params;
    const { idmateria, materia } = request.body;
    const nuevaMateria = { idmateria, materia};

    const actualizacion = await queries.actualizarMateria(id, nuevaMateria);

    response.redirect('/materias');

});

// Endpoint para agregar una materias
router.post('/agregar', isLoggedIn, async(request, response) => {
    
    const { idmateria, materia } = request.body;
    const nuevaMateria = { idmateria, materia};
    
    // Se trata de una insercion
    const resultado = await queries.insertarMateria(nuevaMateria);
    
    response.redirect('/materias');
});

// Endpoint que permite eliminar una materias
router.get('/eliminar/:idmateria', isLoggedIn, async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idmateria
    const { idmateria } = request.params;
    const resultado = await queries.eliminarMateria(idmateria);
    if(resultado > 0){
        console.log('Eliminado con éxito');
    }
    response.redirect('/materias');
});

module.exports = router;
