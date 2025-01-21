import { CartItem } from "./cart-item"; 
// Importa la clase "CartItem" desde el archivo "cart-item". Esto permite utilizar objetos de tipo "CartItem" en esta clase.

export class OrderItem { 
    // Define una clase llamada "OrderItem" que será exportada para ser utilizada en otros archivos.

    imageUrl: string; // Propiedad "imageUrl" que almacena la URL de la imagen del producto en el pedido. Es de tipo cadena.
    unitPrice: number; // Propiedad "unitPrice" que almacena el precio unitario del producto en el pedido. Es de tipo número.
    quantity: number; // Propiedad "quantity" que almacena la cantidad del producto en el pedido. Es de tipo número.
    productId: string; // Propiedad "productId" que almacena el identificador único del producto en el pedido. Es de tipo cadena.

    constructor(cartItem: CartItem) { 
        // Constructor que recibe un objeto de tipo "CartItem" como argumento para inicializar las propiedades de la clase.
        this.imageUrl = cartItem.imageUrl; 
        // Asigna la URL de la imagen del artículo del carrito a la propiedad "imageUrl".
        
        this.quantity = cartItem.quantity; 
        // Asigna la cantidad del artículo del carrito a la propiedad "quantity".
        
        this.unitPrice = cartItem.unitPrice; 
        // Asigna el precio unitario del artículo del carrito a la propiedad "unitPrice".
        
        this.productId = cartItem.id; 
        // Asigna el identificador único del artículo del carrito a la propiedad "productId".
    }
}
