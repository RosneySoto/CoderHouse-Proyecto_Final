const express = require('express');
const router = require('../CODERHOUSE - BACKEND - NODEJS - PROYECTO FINAL/componentes/productos/network');
const routerCarrito = require('../CODERHOUSE - BACKEND - NODEJS - PROYECTO FINAL/componentes/carrito/network');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
  res.sendFile(__dirname + '/public/index.html')
});

app.use('/api', router);
app.use('/api', routerCarrito);

app.listen(8080, () =>{
    console.log('Corriendo en el Puerto 8080')
})