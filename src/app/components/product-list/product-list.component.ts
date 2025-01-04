import { Component, OnInit } from '@angular/core'; // Importa los módulos necesarios para definir un componente y su inicialización.
import { Product } from '../../common/product'; // Importa la clase Product desde el archivo correspondiente.
import { ProductService } from '../../services/product.service'; // Importa el servicio ProductService que manejará las peticiones de productos.
import { CommonModule } from '@angular/common'; // Importa el CommonModule, necesario para usar directivas comunes como ngIf o ngFor.
import { ActivatedRoute, RouterModule } from '@angular/router'; // Importa ActivatedRoute para poder acceder a los parámetros de la ruta.

@Component({
  selector: 'app-product-list', // Define el nombre del selector del componente.
  standalone: true, // Indica que el componente es autónomo y no depende de módulos adicionales.
  imports: [CommonModule, RouterModule], // Declara los módulos necesarios para el componente.
  templateUrl: './product-list-grid.component.html', // Define el archivo HTML que contiene la plantilla del componente.
  styleUrls: ['./product-list.component.css'] // Define el archivo CSS que contiene los estilos del componente.
})
export class ProductListComponent implements OnInit { // Define la clase del componente que implementa OnInit (se ejecuta cuando el componente se inicializa).

  products: Product[] = []; // Arreglo vacío para almacenar los productos que se recuperan de la API.
  currentCategoryId: number = 1; // Define el ID de la categoría actual, por defecto 1.
  searchMode: boolean = false; // Bandera que indica si estamos en modo búsqueda.
tempProductCategory: any;

  constructor(private productService: ProductService, private route: ActivatedRoute) { } // Constructor para inyectar los servicios ProductService y ActivatedRoute.

  ngOnInit() { // El método ngOnInit se ejecuta cuando el componente se inicializa.
    this.route.paramMap.subscribe(() => { // Se suscribe a los cambios en los parámetros de la ruta.
      this.listProducts(); // Llama al método para listar los productos cuando el parámetro cambia.
    });
  }

  listProducts() { // Método para listar los productos según la categoría actual o palabra clave de búsqueda.
    this.searchMode = this.route.snapshot.paramMap.has('keyword'); // Establece si estamos en modo de búsqueda basado en la existencia del parámetro 'keyword'.

    if(this.searchMode){ // Si estamos en modo de búsqueda, maneja la búsqueda de productos.
      this.handleSearchtProducs();
    }
    else { // Si no estamos en modo de búsqueda, maneja la lista de productos por categoría.
      this.handleListProducs();
    }
  }

  handleSearchtProducs() { // Método para manejar la búsqueda de productos según el 'keyword'.
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!; // Obtiene el valor de 'keyword' de los parámetros de la ruta.

    this.productService.searchProducts(theKeyword).subscribe( // Llama al servicio ProductService para buscar productos que coincidan con el 'keyword'.
      data => {
        this.products = data; // Asigna los productos encontrados a la propiedad 'products'.
      }
    );
  }

  handleListProducs() { // Método para manejar la lista de productos basados en la categoría seleccionada.
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id'); // Comprueba si el parámetro 'id' está disponible en la ruta.

    if (hasCategoryId) { // Si existe 'id', lo obtiene y lo convierte a número.
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else { // Si no hay 'id', se asigna el valor por defecto 1.
      this.currentCategoryId = 1;
    }

    this.productService.getProductList(this.currentCategoryId).subscribe( // Llama al servicio ProductService para obtener los productos de la categoría.
      data => {
        this.products = data; // Asigna los productos recibidos a la propiedad 'products'.
      }
    );
  }
}
