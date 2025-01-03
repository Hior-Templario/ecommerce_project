import { Component, OnInit } from '@angular/core'; // Importa los módulos necesarios para definir un componente y su inicialización.
import { Product } from '../../common/product'; // Importa la clase Product desde el archivo correspondiente.
import { ProductService } from '../../services/product.service'; // Importa el servicio ProductService que manejará las peticiones de productos.
import { CommonModule } from '@angular/common'; // Importa el CommonModule, necesario para usar directivas comunes como ngIf o ngFor.
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute para poder acceder a los parámetros de la ruta.

@Component({
  selector: 'app-product-list', // Define el nombre del selector del componente, usado para incluir este componente en plantillas HTML.
  standalone: true, // Indica que el componente es autónomo y no depende de módulos adicionales.
  imports: [CommonModule], // Declara los módulos necesarios para el componente. En este caso, CommonModule.
  templateUrl: './product-list-grid.component.html', // Define el archivo HTML que contiene la plantilla del componente.
  styleUrls: ['./product-list.component.css'] // Define el archivo CSS que contiene los estilos del componente.
})
export class ProductListComponent implements OnInit { // Define la clase del componente que implementa OnInit (interfaz que indica que se ejecuta cuando el componente se inicializa).

  products: Product[] = []; // Crea un arreglo vacío para almacenar los productos que se recuperan de la API.
  currentCategoryId: number = 1; // Define el ID de la categoría actual, por defecto 1.
  searchMode: boolean = false;

  // El constructor recibe el servicio ProductService para manejar las peticiones de productos 
  // y ActivatedRoute para acceder a los parámetros de la ruta.
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  // El método ngOnInit se ejecuta cuando el componente se inicializa.
  ngOnInit() {
    // Se suscribe a los cambios en los parámetros de la ruta para cargar los productos cada vez que cambien.
    this.route.paramMap.subscribe(() => {
      this.listProducts(); // Llama al método para listar los productos cuando el parámetro cambia.
    });
  }

  // Método para listar los productos según la categoría actual.
  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchtProducs();
    }
    else {
      this.handleListProducs();
    }

   
  }
  handleSearchtProducs() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!; 

    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleListProducs(){

     // Comprueba si el parámetro "id" está disponible en la ruta.
     const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

     if (hasCategoryId) {
       // Si existe un "id" en los parámetros de la ruta, se obtiene el valor y se convierte a número.
       this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
     }
     else {
       // Si no hay "id" en los parámetros, se asigna el valor por defecto 1.
       this.currentCategoryId = 1;
     }
 
     // Llama al servicio para obtener la lista de productos para la categoría actual.
     this.productService.getProductList(this.currentCategoryId).subscribe(
       data => {
         this.products = data; // Asigna los datos recibidos de la API al arreglo de productos.
       },
       
     )
  }
}
