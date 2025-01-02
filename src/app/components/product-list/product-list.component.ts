// Importa los módulos necesarios para el componente.
import { Component, OnInit } from '@angular/core'; // Importa los decoradores Component y OnInit de Angular.
import { Product } from '../../common/product'; // Importa la clase Product para definir la estructura de los productos.
import { ProductService } from '../../services/product.service'; // Importa el servicio ProductService para obtener datos de productos.
import { CommonModule } from '@angular/common'; // Importa el módulo CommonModule, que proporciona directivas comunes de Angular como ngIf, ngFor, etc.
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute para obtener parámetros de la ruta actual, como el ID de categoría.


// Decorador que define un componente de Angular
@Component({
  selector: 'app-product-list', // Selector que identifica este componente en el DOM
  standalone: true, // Indica que el componente puede funcionar de forma independiente
  imports: [CommonModule], // Módulos necesarios para este componente
  templateUrl: './product-list-grid.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./product-list.component.css'] // Ruta a los estilos CSS asociados
})

export class ProductListComponent implements OnInit {

  // Arreglo que almacenará los productos recuperados
  products: Product[] = [];
  // Variable que almacena el ID de la categoría actual, inicializada por defecto a 1
  currentCategoryId: number = 1;

  // Constructor que inyecta los servicios necesarios
  constructor(private productService: ProductService, // Servicio para obtener datos de productos
    private route: ActivatedRoute) { } // Servicio para manejar rutas activas

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    // Suscripción a los cambios en los parámetros de la ruta
    this.route.paramMap.subscribe(() => {
      this.listProducts(); // Llama al método para listar productos
    });
  }

  // Método para listar productos según la categoría
  listProducts() {

    // Verifica si el parámetro "id" está disponible en la ruta
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // Obtiene el parámetro "id" como cadena y lo convierte a número usando el símbolo "+"
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      // Si no hay un ID de categoría, se usa el ID por defecto (1)
      this.currentCategoryId = 1;
    }

    // Recupera los productos para el ID de categoría actual
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data; // Asigna los datos recuperados al arreglo de productos
      },
    )
  }
}
