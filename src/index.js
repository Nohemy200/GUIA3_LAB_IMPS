const express = require('express');

const app = express();

require('dotenv').config();

app.set('port', process.env.PORT || 4500);

//configuracion de rutas
app.use(require('./routes'));//node automaticamente busca el index.js del modeulo

app.listen(app.get('port'), () =>{
    console.log('servidor iniciado en el puerto: ', app.get('port'));
});