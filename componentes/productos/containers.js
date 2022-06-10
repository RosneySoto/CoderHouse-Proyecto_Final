const fs = require('fs');

class Container{
    
    constructor(archivo){
        this.archivo = archivo;
    };

    static ID = 0;
    static timestamp = Date.now();
    static productos = []

    static generarID(item){
        return  item.id = ++Container.ID;
    };

    static writeProducts = async (producto) =>{
        try {
            return await fs.promises.writeFile('productos.txt', JSON.stringify(producto));
        } catch (error) {
            console.error('[ERROR==]', error)
        };
    };
    
    static readAllProducst = async () => {
        try{
          let content = await fs.promises.readFile('productos.txt', 'utf-8');
          return JSON.parse(content);
        }catch(err){
          console.error('[READ ERROR]',err);
        };
    };

    async guardar(nuevoElemento){
        try {
            const id = ++Container.ID;
            const ListaProductos = Container.productos
            nuevoElemento.id = id;
            nuevoElemento.timestamp = Container.timestamp;
            ListaProductos.push(nuevoElemento);
            await Container.writeProducts(ListaProductos);
            const productos = await Container.readAllProducst();
            return nuevoElemento.id;
        } catch (error) {
            console.log('[ERROR AL GUARDAR]', error);
        };
    };

    async getAll(){
        try {
            return await Container.readAllProducst();
        } catch (error) {
            console.log('[ERROR AL LISTAR LOS PRODUCTOS]', error);
        };
    };

    async getAllById(id){
        try {
            const productos = await Container.readAllProducst();
            if(Array.isArray(productos)){
                const result = productos.find(i => i.id == id)
                return result;
            }
        } catch (error) {
            console.log('[ERROR AL BUSCAR POR ID]', error);
        };
    };

    async delete(id){
        try {
            const productos = await readAllProducst();
            if(Array.isArray(productos) && typeof id == 'number'){
                const listaProductosActualizada = productos.filter(i => i.id !== id)
                await writeProducts(listaProductosActualizada);
                return listaProductosActualizada;
            };
        } catch (error) {
            console.log('[ERROR AL BORRAR EL PRODUCTO]', error);
        };
    };


};

module.exports = Container