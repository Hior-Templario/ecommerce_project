import { Component, OnInit } from '@angular/core'; // Importa los módulos necesarios para definir un componente y su inicialización.
import { ProductCategory } from '../../common/product-category'; // Importa la clase ProductCategory desde el archivo correspondiente.
import { ProductService } from '../../services/product.service'; // Importa el servicio ProductService que manejará las peticiones de productos.
import { CommonModule } from '@angular/common'; // Importa el CommonModule, necesario para usar directivas comunes como ngIf o ngFor.
import { RouterLinkActive, RouterModule } from '@angular/router'; // Importa RouterLinkActive y RouterModule para la navegación y control de rutas.

@Component({
  selector: 'app-product-category-menu', // Define el nombre del selector del componente.
  standalone: true, // Indica que el componente es autónomo y no depende de módulos adicionales.
  imports: [CommonModule, RouterModule, RouterLinkActive], // Declara los módulos necesarios para el componente.
  templateUrl: './product-category-menu.component.html', // Define el archivo HTML que contiene la plantilla del componente.
  styleUrls: ['./product-category-menu.component.css'] // Define el archivo CSS que contiene los estilos del componente.
})
export class ProductCategoryMenuComponent implements OnInit { // Clase del componente que implementa OnInit (se ejecuta cuando el componente se inicializa).

  productCategories: ProductCategory[] = []; // Arreglo vacío para almacenar las categorías de productos.

  constructor(private productService: ProductService) {} // Constructor para inyectar el servicio ProductService.

  ngOnInit() { // Método que se ejecuta cuando el componente se inicializa.
    this.listProductCategories(); // Llama al método para listar las categorías de productos.
  }

  listProductCategories() { // Método para obtener la lista de categorías de productos desde el servicio.
    this.productService.getProductCategories().subscribe( // Se suscribe a la respuesta del servicio.
      data => { // Maneja la respuesta de los datos.
        console.log('Product Categories=' + JSON.stringify(data)); // Muestra las categorías en la consola.
        this.productCategories = data; // Asigna las categorías recibidas a la propiedad productCategories.
      },
    );
  }
}
