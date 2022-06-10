const express = require('express');
const router = express.Router();
const ContainerCarrito = require('../carrito/containers');

const carritos = new ContainerCarrito('carrito.txt');

router.get('/carrito', async (req, res) =>{
    try {
        const items = await carritos.getAllCarritos();
        if(Array.isArray(items)){
            res.send({items}).status(200);
        };
    } catch (error) {
        console.log('[ERROR EN EL ROUTER GET]', error)
    };
});

router.get('/carrito/:id', async (req, res) =>{
    const id = req.params.id
    try {
        const items = await carritos.getAllCarritos();
        if(Array.isArray(items)){
            const item = items.find(i => i.id == id);
            res.json({item})
        };
    } catch (error) {
        console.log('[ERROR AL BUSCAR POR ID]', error)
    };
});

router.post('/carrito', async (req, res) =>{
    try {
        const newCarrito = await carritos.crearCarrito();
        res.send({id: newCarrito}).status(201);
    } catch (error) {
        console.log('[ERROR AL CREAR EL CARRITO]', error);
    };
});

router.post('/carrito/:id/productos', async (req, res) =>{
    try {
        const id = req.params.id
        const productos = req.body;
        const newCarrito = await carritos.updateById(id, productos);
        res.send({id: newCarrito}).status(201);
    } catch (error) {
        console.log('[ERROR AL CREAR EL CARRITO]', error);
    };
});

router.delete('/carrito/:id', async (req, res, next) =>{
    try {
        const id = req.params.id
        const data = await carritos.getAllCarritos();
        const carritoList = data.filter(element => element.id != id)
        await ContainerCarrito.writeCarrito(carritoList);
        res.send({items: carritoList}).status(200);
    } catch (error) {
        console.log('[ERROR AL ELIMINAR EL CARRITO', error);
    };
});

router.delete('/carrito/:id/productos/id_prod', async (req, res, next) =>{
    try {
        const id = req.params.id
        const prodId = req.params.id_prod;  
        await carritos.deleteProdById(id, prodId);
        res.send({items: carritos}).status(200);
    } catch (error) {
        console.log('[ERROR AL ELIMINAR EL CARRITO', error);
    };
});


module.exports = router;