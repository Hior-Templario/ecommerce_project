import { Component, OnInit } from '@angular/core'; // Importa los módulos necesarios para definir un componente y manejar su ciclo de vida.
import { Product } from '../../common/product'; // Modelo que representa los datos de un producto.
import { ProductService } from '../../services/product.service'; // Servicio para interactuar con la API de productos.
import { CommonModule } from '@angular/common'; // Módulo necesario para usar directivas comunes como *ngIf y *ngFor.
import { ActivatedRoute, RouterModule } from '@angular/router'; // Permite acceder a parámetros en la URL y navegar entre rutas.
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'; // Módulo para implementar la paginación de Bootstrap en Angular.

@Component({
  selector: 'app-product-list', // Define el selector HTML para este componente.
  standalone: true, // Indica que el componente es independiente y no necesita un módulo externo.
  imports: [CommonModule, RouterModule, NgbPaginationModule], // Especifica los módulos externos que el componente necesita.
  templateUrl: './product-list-grid.component.html', // Archivo HTML que define la estructura de este componente.
  styleUrls: ['./product-list.component.css'] // Archivo CSS que contiene los estilos específicos del componente.
})
export class ProductListComponent implements OnInit { // Clase principal del componente, implementa OnInit para inicialización.

  // Define las variables que se usan para gestionar el estado del componente.
  products: Product[] = []; // Almacena la lista de productos obtenida desde el servicio.
  currentCategoryId: number = 1; // ID de la categoría seleccionada (valor por defecto: 1).
  previousCategoryId: number = 1; // Almacena el ID de la categoría anterior para detectar cambios.
  searchMode: boolean = false; // Bandera para indicar si el usuario está realizando una búsqueda por palabra clave.

  thePageNumber: number = 1; // Número actual de la página (para la paginación).
  thePageSize: number = 5; // Número de productos por página.
  theTotalElements: number = 0; // Total de productos disponibles en la categoría actual o resultado de búsqueda.

  previousKeyword: string = ""; // Almacena la última palabra clave de búsqueda para evitar búsquedas repetidas.

  constructor(private productService: ProductService, private route: ActivatedRoute) { } 
  // Constructor del componente, inyecta dependencias:
  // - `ProductService`: Servicio que interactúa con la API para obtener productos.
  // - `ActivatedRoute`: Permite acceder a los parámetros de la ruta actual.

  ngOnInit() { 
    // Se ejecuta cuando el componente es inicializado.
    this.route.paramMap.subscribe(() => { 
      // Se suscribe a los cambios en los parámetros de la URL.
      this.listProducts(); 
      // Llama al método que actualiza la lista de productos cada vez que cambia la URL.
    });
  }

  listProducts() { 
    // Decide si mostrar productos por búsqueda o por categoría.
    this.searchMode = this.route.snapshot.paramMap.has('keyword'); 
    // Comprueba si la URL contiene un parámetro 'keyword' para activar el modo de búsqueda.

    if (this.searchMode) { 
      // Si el usuario está buscando por palabra clave.
      this.handleSearchProducts();
    } else { 
      // Si el usuario navega por categorías.
      this.handleListProducts();
    }
  }

  handleSearchProducts() { 
    // Maneja la lógica de búsqueda de productos por palabra clave.
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!; 
    // Obtiene la palabra clave del parámetro 'keyword' en la URL.

    if (this.previousKeyword !== theKeyword) {
      // Si la palabra clave ha cambiado, reinicia la paginación a la primera página.
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword; // Actualiza el valor de la palabra clave anterior.

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`); 
    // Imprime en la consola para depuración.

    this.productService.searchProductsPaginate(
      this.thePageNumber - 1, // Ajusta el número de página (la API usa índices basados en cero).
      this.thePageSize, // Tamaño de la página.
      theKeyword // Palabra clave para la búsqueda.
    ).subscribe(this.processResult());
    // Llama al servicio para buscar productos y se suscribe para procesar los resultados.
  }

  handleListProducts() { 
    // Maneja la lógica de listar productos según la categoría seleccionada.
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id'); 
    // Comprueba si la URL contiene un parámetro 'id'.

    if (hasCategoryId) { 
      // Si existe, obtiene el ID de la categoría de la URL.
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else { 
      // Si no hay ID en la URL, asigna la categoría por defecto (1).
      this.currentCategoryId = 1;
    }

    if (this.previousCategoryId !== this.currentCategoryId) {
      // Si la categoría cambió, reinicia la paginación a la primera página.
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId; 
    // Actualiza el valor de la categoría anterior.

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`); 
    // Imprime en la consola para depuración.

    this.productService.getProductListPaginate(
      this.thePageNumber - 1, // Ajusta el número de página.
      this.thePageSize, // Tamaño de la página.
      this.currentCategoryId // Categoría actual seleccionada.
    ).subscribe(this.processResult());
    // Llama al servicio para obtener productos y se suscribe para procesar los resultados.
  }

  updatePageSize(pageSize: string) { 
    // Actualiza el tamaño de la página y reinicia la lista de productos.
    this.thePageSize = +pageSize; // Convierte el tamaño de página a número.
    this.thePageNumber = 1; // Reinicia a la primera página.
    this.listProducts(); // Actualiza la lista de productos.
  }

  processResult() { 
    // Procesa los datos obtenidos de la API y los asigna a las variables del componente.
    return (data: any) => {
      this.products = data._embedded.products; // Lista de productos obtenida de la API.
      this.thePageNumber = data.page.number + 1; // Actualiza el número de página.
      this.thePageSize = data.page.size; // Actualiza el tamaño de la página.
      this.theTotalElements = data.page.totalElements; // Total de productos disponibles.
    };
  }
}
