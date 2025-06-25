import { Product } from "./product"; 
// Importa la clase "Product" desde el archivo "product". Esto permite usarla como tipo en este archivo.

export class CartItem { 
    // Define una clase llamada "CartItem" que será exportada para ser utilizada en otros archivos.

    id: string; // Propiedad "id" que almacena el identificador único del producto. Es de tipo cadena.
    name: string; // Propiedad "name" que almacena el nombre del producto. Es de tipo cadena.
    imageUrl: string; // Propiedad "imageUrl" que almacena la URL de la imagen del producto. Es de tipo cadena.
    unitPrice: number; // Propiedad "unitPrice" que almacena el precio unitario del producto. Es de tipo número.

    quantity: number; // Propiedad "quantity" que almacena la cantidad de este producto en el carrito. Es de tipo número.

    constructor(product: Product) { 
        // Constructor que recibe un objeto de tipo "Product" como argumento e inicializa las propiedades del carrito.
        this.id = product.id; // Asigna el id del producto al id del artículo del carrito.
        this.name = product.name; // Asigna el nombre del producto al nombre del artículo del carrito.
        this.imageUrl = product.imageUrl; // Asigna la URL de la imagen del producto al artículo del carrito.
        this.unitPrice = product.unitPrice; // Asigna el precio unitario del producto al artículo del carrito.

        this.quantity = 1; // Inicializa la cantidad en el carrito con un valor por defecto de 1.
    }
}
