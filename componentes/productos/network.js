const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const ContarinerProductos = require('./containers');

router.get('/productos', function(req, res){
    ContarinerProductos.obtenerProductos()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'ERROR AL CREAR EL PRODUCTO', 404, err)
        })
});

module.exports = router;