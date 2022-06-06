const fs = require('file-system');

class ContarinerProductos{
    static ID = 0;
    static productos = [];

    constructor(archivoProducto){
        this.archivoProducto = archivoProducto;
    };

    productoNuevo = new ContarinerProductos('productos.txt');


    static generarID(item){
        return item.id = ++ContarinerProductos.ID;
    };
    
    static writeProducts = async (producto) =>{
        try {
            return await fs.promises.writeFile(this.archivoProducto, JSON.stringify(producto));
        } catch (error) {
            console.error('[ERROR==]', error)
        };
    };
    
    static readAllProducst = async () => {
        try{
            const content = await fs.promises.readFile('productos.txt', 'utf-8');
            return JSON.parse(content);
        }catch(err){
            console.error('[READ ERROR]',err);
        };
    };
    
    static obtenerProductos = async () =>{
        try {
            const result = ContarinerProductos.readAllProducst();
            return result;    
        } catch (error) {
            console.log('[ERROR AL OBTENER TODOS LOS PRODUCTOS]', error);
        };
    }
    
    async crearProducto(producto){ 
        try {
            const id = ++ContarinerProductos.ID;
            const listaProductos = ContarinerProductos.productos;
            nuevoElemento.id = id;
            listaProductos.push(nuevoElemento);
            ContarinerProductos.writeProducts(listaProductos);
            const result = ContarinerProductos.readAllProducst();
            return nuevoElemento.id;
        } catch (error) {
            console.log('[ERROR AL CREAR PRODUCTOS]')
        }

    };
}

module.exports = ContarinerProductos;