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
            res.json({carritos: item})
        };
    } catch (error) {
        console.log('[ERROR AL BUSCAR POR ID]', error)
    };
});

router.post('/carrito', async (req, res) =>{
    try {
        const nuevoCarrito = req.body;
        const carritoId = await carritos.guardarCarrito(nuevoCarrito);
        res.send({carritos: nuevoCarrito}).status(201);
    } catch (error) {
        console.log('[ERROR AL CREAR EL CARRITO]', error);
    };
});

router.put('/carrito/:id', async (req, res) =>{
    try {
        const id = req.params.id
        const carritoEditado = req.body;
        const data = await carritos.getAllCarritos();
        const listaCarritos = data.map(i =>{
            if(parseFloat(i.id) === parseFloat(id)){
                return {
                    id: i.id,
                    ...carritoEditado
                }
            }else{
                return i
            };
        })
        await ContainerCarrito.writeCarrito(listaCarritos);
        const carritoId = await ContainerCarrito.readAllCarritos();
        res.send({items: listaCarritos}).status(200);
    } catch (error) {
        console.log('[ERROR AL EDITAR EL CARRITO]', error);
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

module.exports = router;