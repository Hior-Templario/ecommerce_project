export class Product {  
    // Define una clase llamada "Product" que será exportada para ser utilizada en otros archivos.
    // Representa un producto con varias propiedades asociadas, como detalles, precios y fechas.

    constructor(
        public id: string,
        // Propiedad pública "id" que almacena un identificador único para el producto (tipo cadena).

        public sku: string,
        // Propiedad pública "sku" (Stock Keeping Unit), que es un código único utilizado para rastrear el producto en inventarios.

        public name: string,
        // Propiedad pública "name" que almacena el nombre del producto.

        public description: string,
        // Propiedad pública "description" que almacena una descripción del producto.

        public unitPrice: number,
        // Propiedad pública "unitPrice" que almacena el precio unitario del producto.

        public imageUrl: string,
        // Propiedad pública "imageUrl" que almacena la URL de la imagen del producto.

        public active: boolean,
        // Propiedad pública "active" que indica si el producto está activo o disponible para la venta (valor booleano).

        public unitsInStock: number,
        // Propiedad pública "unitsInStock" que almacena la cantidad de unidades disponibles en el inventario.

        public dateCreated: Date,
        // Propiedad pública "dateCreated" que almacena la fecha en la que se creó el producto.

        public lastUpdated: string
        // Propiedad pública "lastUpdated" que almacena la última fecha de actualización del producto.
        // Nota: Sería mejor que este campo también fuese de tipo `Date` para consistencia y para facilitar operaciones relacionadas con fechas.
    ) {
        // Constructor que inicializa las propiedades de la clase utilizando los valores pasados como parámetros.
    }
}
