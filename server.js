const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const routes = require('./network/routes');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

routes(app);
app.use('/api', express.static('public'));

server.listen(PORT, () =>{
    console.log(`Ejecutando en el puerto http://localhost:${PORT}`);
});
