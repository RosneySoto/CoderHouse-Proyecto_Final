const express = require('express');
const router = express.Router();
const Container = require('../productos/containers');

const productos = new Container('productos.txt');

router.get('/productos', async (req, res) =>{
    try {
        const items = await productos.getAll();
        if(Array.isArray(items)){
            res.send({items}).status(200);
        };
    } catch (error) {
        console.log('[ERROR EN EL ROUTER GET]', error)
    };
});

router.get('/productos/:id', async (req, res) =>{
    const id = req.params.id
    try {
        const items = await productos.getAll();
        if(Array.isArray(items)){
            const item = items.find(i => i.id == id);
            res.json({productos: item})
        };
    } catch (error) {
        console.log('[ERROR AL BUSCAR POR ID]', error)
    };
});

router.post('/productos', async (req, res) =>{
    try {
        const nuevoProducto = req.body;
        const productoId = await productos.guardar(nuevoProducto);
        res.send({productos: nuevoProducto}).status(201);
    } catch (error) {
        console.log('[ERROR AL CREAR EL PRODUCTO]', error);
    };
});

router.put('/productos/:id', async (req, res) =>{
    try {
        const id = req.params.id
        const productoEditado = req.body;
        const data = await productos.getAll();
        const listaProductos = data.map(i =>{
            if(parseFloat(i.id) === parseFloat(id)){
                return {
                    id: i.id,
                    ...productoEditado
                }
            }else{
                return i
            };
        })
        await Container.writeProducts(listaProductos);
        const productoId = await Container.readAllProducst();
        res.send({items: listaProductos}).status(200);
    } catch (error) {
        console.log('[ERROR AL EDITAR PRODUCTO]', error);
    };
});

router.delete('/productos/:id', async (req, res, next) =>{
    try {
        const id = req.params.id
        const data = await productos.getAll()
        const productList = data.filter(element => element.id != id)
        await Container.writeProducts(productList)
        console.log(productList)
        res.send({items: productList}).status(200);
    } catch (error) {
        console.log('[ERROR AL ELIMINAR PRODUCTO', error);
    };
});

module.exports = router;