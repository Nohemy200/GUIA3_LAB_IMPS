const express = require('express');

const app = express();

app.set('port', process.env.PORT || 400);

app.listen(app.get('port'), () =>{
    console.log('servidor iniciado en el puerto: ', app.get('port'));
});