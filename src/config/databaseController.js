const mysql=require('mysql2');
const { promisify } = require('util');
const {database} = require('./keys');
const {CONSTANTS} = require('../utils/utils');

const pool = mysql.createPool(database);
//iniciando conexion con la base de datos
pool.getConnection((error, conexion)=>{
    //validar si la coneccion tiene algun tipo de error
    if(error){
        //validar codigos de errores mas comunes
        switch(error.code){
            case CONSTANTS.PROTOCOL_CONNECTIONS_LOST:
                console.error('DATABASE CONNECTIONS WAS CLOSED');
            break;

            //indica que exiten demaciadas conexiones
            case CONSTANTS.ER_CON_COUNT_ERROR:
                console.error('DATABASE HAS TO MANY CONNECTIONS');
            break;

            //INDICA Q LA CONEXION FUE RECHAZADA
            case CONSTANTS.ECONNREFUSED:
                console.error('DATABASE CONNECTIONS WAS REFUSED');
            break;

            //INIDICA Q EL ACCESO EST ADENEGADO
            case CONSTANTS.ER_ACCESS_DENIED_ERROR:
                console.error('DATABASE CONNECTIONS WAS REFUSED');
            break;
            default:
                console.error('error de la base de datos no encontrado');
                break;

        }  

    }

    //si la conexion es exitosa imprimir un mensaje indicado
    if(conexion){
        console.log('conexion establecida con la base de datos');
        conexion.release();
    }
    return;

});

//configurando PROMISITY para permitir en cada consulta un async/await (promesas)
pool.query=promisify(pool.query);

module.exports=pool;