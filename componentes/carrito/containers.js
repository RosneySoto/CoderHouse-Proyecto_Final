const fs = require('file-system');
const Container = require('../productos/containers');

class ContainerCarrito{
    static ID = 0;
    static carritos = [
        {
            timeStamp: Date.now(),
            productos: [{
                Container
            }]
        }
    ];

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

    async guardarCarrito(nuevoElemento){
        try {
            const id = ++ContainerCarrito.ID;
            const listaCarritos = ContainerCarrito.carritos
            nuevoElemento.id = id;
            listaCarritos.push(nuevoElemento);
            await ContainerCarrito.writeCarrito(listaCarritos);
            const carritos = await ContainerCarrito.readAllCarritos();
            return nuevoElemento.id;
        } catch (error) {
            console.log('[ERROR AL GUARDAR EL CARRITO]', error);
        }
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