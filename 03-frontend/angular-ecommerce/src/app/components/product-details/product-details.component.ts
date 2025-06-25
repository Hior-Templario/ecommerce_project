// Importaciones necesarias para el componente
import { Component, OnInit } from '@angular/core'; // Decorador para definir un componente y la interfaz OnInit para manejar la inicialización
import { Product } from '../../common/product'; // Modelo que representa un producto
import { ProductService } from '../../services/product.service'; // Servicio para obtener información de productos
import { ActivatedRoute, RouterModule } from '@angular/router'; // Módulos de Angular para manejar rutas y parámetros en la URL
import { CommonModule } from '@angular/common'; // Módulo común de Angular con funcionalidades básicas
import { CartService } from '../../services/cart.service'; // Servicio para manejar el carrito de compras
import { CartItem } from '../../common/cart-item'; // Modelo que representa un elemento en el carrito

// Decorador para definir el componente
@Component({
  selector: 'app-product-details', // Nombre del selector para usar el componente en la vista
  standalone: true, // Indica que este componente es independiente y puede usarse sin un módulo
  imports: [CommonModule, RouterModule], // Importación de módulos utilizados en la plantilla HTML
  templateUrl: './product-details.component.html', // Ruta al archivo de la plantilla HTML
  styleUrls: ['./product-details.component.css'] // Ruta al archivo de estilos CSS
})
export class ProductDetailsComponent implements OnInit { // Definición de la clase del componente e implementación de OnInit para inicialización

  product!: Product; // Declaración de la variable que almacenará los detalles del producto, usando el modelo `Product`

  // Constructor que inyecta los servicios necesarios
  constructor(
    private productService: ProductService, // Servicio para obtener datos del producto
    private cartService: CartService, // Servicio para manejar el carrito de compras
    private router: ActivatedRoute // Servicio para acceder a los parámetros de la ruta actual
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Suscripción a los cambios en los parámetros de la URL
    this.router.paramMap.subscribe(() => {
      this.handleProductDetails(); // Llama al método para manejar los detalles del producto
    });
  }

  // Método para obtener los detalles del producto basado en el ID de la ruta
  handleProductDetails() {
    // Obtiene el ID del producto desde los parámetros de la ruta y lo convierte a número
    const theProductId: number = +this.router.snapshot.paramMap.get('id')!;

    // Llama al servicio para obtener los detalles del producto desde el backend
    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data; // Asigna los datos del producto a la variable `product`
      }
    );
  }

  // Método para agregar el producto al carrito
  addToCart() {
    // Imprime en la consola el producto que se está agregando al carrito
    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);

    // Crea un nuevo elemento del carrito usando el producto actual
    const theCartItem = new CartItem(this.product);

    // Llama al servicio para agregar el elemento al carrito
    this.cartService.addToCart(theCartItem);
  }
}
