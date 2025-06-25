import { Component, OnInit } from '@angular/core'; // Importación de Component y OnInit desde Angular Core
import { CartItem } from '../../common/cart-item'; // Importación del modelo CartItem
import { CartService } from '../../services/cart.service'; // Importación del servicio CartService
import { CommonModule } from '@angular/common'; // Importación del módulo común de Angular para funcionalidades básicas
import { RouterModule } from '@angular/router'; // Importación de RouterModule para navegación

@Component({
  selector: 'app-cart-details', // Selector para identificar el componente
  standalone: true, // Indica que el componente es independiente
  imports: [CommonModule, RouterModule], // Módulos que el componente necesita importar
  templateUrl: './cart-details.component.html', // Ruta al archivo de la plantilla HTML
  styleUrls: ['./cart-details.component.css'] // Ruta al archivo de estilos CSS
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = []; // Arreglo para almacenar los elementos del carrito
  totalPrice: number = 0; // Variable para el precio total del carrito
  totalQuantity: number = 0; // Variable para la cantidad total de productos en el carrito

  constructor(private cartService: CartService) { } // Inyección del servicio CartService en el constructor

  ngOnInit(): void {
    // Método del ciclo de vida que se ejecuta al inicializar el componente
    this.listCarDetails(); // Llamada al método para listar detalles del carrito
  }

  listCarDetails() {
    // Método para listar los detalles del carrito

    // Obtener una referencia a los elementos del carrito
    this.cartItems = this.cartService.cartItems;

    // Suscribirse al observable totalPrice para obtener actualizaciones del precio total
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data // Actualiza la variable totalPrice con el dato recibido
    );

    // Suscribirse al observable totalQuantity para obtener actualizaciones de la cantidad total
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data // Actualiza la variable totalQuantity con el dato recibido
    );

    // Calcular el precio total y la cantidad total del carrito
    this.cartService.computeCartTotals();
  }

  incrementQuantity(theCartItem: CartItem) {
    // Método para incrementar la cantidad de un producto en el carrito
    this.cartService.addToCart(theCartItem); // Llama al servicio para añadir el producto
  }

  decrementQuantity(theCartItem: CartItem) {
    // Método para disminuir la cantidad de un producto en el carrito
    this.cartService.decrementQuantity(theCartItem); // Llama al servicio para disminuir la cantidad
  }

  remove(theCartItem: CartItem) {
    // Método para eliminar un producto del carrito
    this.cartService.remove(theCartItem); // Llama al servicio para remover el producto
  }
}
