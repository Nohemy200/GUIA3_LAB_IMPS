const pool=require('../config/databaseController');

module.exports={
    //
    obtenerTodosLosEstudiantes: async()=>{
        try {
            const result=await pool.query('SELECT *FROM estudiantes');
            return result;
        } catch (error) {
            console.error('ocurrio un problema al consultar la lista de estudiantes:n', error);
        }
    }
}