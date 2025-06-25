import { Component, OnInit } from '@angular/core'; 
// Importación de Component y OnInit desde Angular Core
import { CartService } from '../../services/cart.service'; 
// Importación del servicio CartService
import { CommonModule } from '@angular/common'; 
// Importación del módulo común para funcionalidades estándar de Angular
import { RouterModule } from '@angular/router'; 
// Importación del módulo de enrutamiento para navegación

@Component({
  selector: 'app-cart-status', 
  // Selector para identificar el componente en el HTML
  standalone: true, 
  // Indica que este componente es independiente
  imports: [CommonModule, RouterModule], 
  // Módulos requeridos para el funcionamiento del componente
  templateUrl: './cart-status-component.html', 
  // Ruta al archivo de la plantilla HTML del componente
  styleUrls: ['./cart-status-component.css'] 
  // Ruta al archivo de estilos CSS del componente
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0.00; 
  // Variable para almacenar el precio total del carrito
  totalQuantity: number = 0; 
  // Variable para almacenar la cantidad total de productos

  constructor(private cartService: CartService) { } 
  // Inyección del servicio CartService en el constructor

  ngOnInit(): void {
    // Método del ciclo de vida que se ejecuta al inicializar el componente
    this.updateCartStatus(); 
    // Llama al método para actualizar el estado del carrito
  }

  updateCartStatus() {
    // Método para suscribirse a las actualizaciones del estado del carrito

    // Suscribirse al observable totalPrice del servicio del carrito
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data 
      // Actualiza la variable totalPrice con el valor recibido
    );

    // Suscribirse al observable totalQuantity del servicio del carrito
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data 
      // Actualiza la variable totalQuantity con el valor recibido
    );
  }
}
