const fs = require('fs');
const Container = require('../productos/containers');

class ContainerCarrito{

    constructor(archivo){
        this.archivo = archivo;
    };

    static id = 1;
    static timestamp = Date.now();
    static carritos = []

    static generarID(item){
        return item.id = ++ContainerCarrito.ID;
    };

    static writeCarrito = async (carrito) =>{
        try {
            return await fs.promises.writeFile('carrito.txt', JSON.stringify(carrito));
        } catch (error) {
            console.log('[ERROR AL ESCRIBIR PRODUCTOS EN TXT]', error);
        };
    };

    static readAllCarritos = async () =>{
        try {
            const contenido = await fs.promises.readFile('carrito.txt', 'utf-8');
            return JSON.parse(contenido);
        } catch (error) {
            console.log('[ERROR AL LEER EL CARRITO]', error);
        };
    };

    async crearCarrito(){
        let contenido = await fs.promises.readFile(this.archivo,'utf-8');
        let carritos = JSON.parse(contenido);
        carritos.forEach(prod => {
            if (ContainerCarrito.id <= prod.id) {
                ContainerCarrito.id++;
            }
        });
        let carrito = {
            id: ContainerCarrito.id,
            timestamp: ContainerCarrito.timestamp,
            productos: []
        }
        let json = JSON.stringify([...carritos,carrito]);
        await fs.promises.writeFile(this.archivo,json,(err) => {
            if (err) {
                console.log('Hubo un error al cargar el carrito');
            } else {
                console.log(carrito.id);
            }
        })
        return carrito.id;
    };

    async getAllCarritos(){
        try {
            return await ContainerCarrito.readAllCarritos();
        } catch (error) {
            console.log('[ERROR AL LISTAR LOS CARRITOS]', error);
        };
    };

    async getAllById(id){
        try {
            const carritos = await ContainerCarrito.readAllCarritos();
            if(Array.isArray(carritos)){
                const result = carritos.find(i => i.id == id)
                return result;
            }
        } catch (error) {
            console.log('[ERROR AL BUSCAR POR ID]', error);
        };
    };

    //INGRESA UN PRODUCTO A UN CARRITO SELECCIONADO POR ID
    async updateById(id, productos){
        try {
            const carritos = await ContainerCarrito.readAllCarritos();
            let carrito
            if(Array.isArray(carritos)){
                carrito = carritos.find(i => i.id == id)
                carrito['productos'].push(productos)
            }
            let json = JSON.stringify([...carritos]);
            await fs.promises.writeFile(this.archivo, json,(err) => {
                if (err) {
                    console.log('Hubo un error al cargar el carrito');
                } else {
                    console.log(carrito.id);
                }
            })
            return carrito
        } catch (error) {
            console.log('[ERROR AL BUSCAR POR ID]', error);
        };
    };

    async deleteProdById(id, productoId){
        try {
            const contenido = await ContainerCarrito.readAllCarritos();
            const carritosParseado = JSON.parse(contenido);
            const carrito = await carritosParseado.find(i => i.id === parseInt(id));
            carritoSinProd = await carrito.productos.filter(i => i.id !== parseInt(productoId));
            carrito.productos = carritoSinProd;
            await ContainerCarrito.writeCarrito(carritosParseado)
        } catch (error) {
         console.log('[ERROR AL BORRAR EL PRODUCTO DEL CARRITO]')   
        }

    }

    async delete(id){
        try {
            const carritos = await readAllCarritos();
            if(Array.isArray(carritos) && typeof id == 'number'){
                const listaCarritosActualizada = carritos.filter(i => i.id !== id)
                await writeProducts(listaCarritosActualizada);
                return listaCarritosActualizada;
            };
        } catch (error) {
            console.log('[ERROR AL BORRAR EL CARRITO]', error);
        };
    };



};

module.exports = ContainerCarrito;