import { Component } from '@angular/core';  // Importa el decorador Component para definir un componente en Angular.
import { CommonModule } from '@angular/common';  // Importa CommonModule para utilizar funcionalidades comunes de Angular como ngIf, ngFor.
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';  // Importa las directivas de enrutamiento necesarias para navegar entre componentes.
import { ProductCategoryMenuComponent } from "./components/product-category-menu/product-category-menu.component";  // Importa el componente para mostrar el menú de categorías de productos.
import { SearchComponent } from "./components/search/search.component";  // Importa el componente de búsqueda de productos.
import { CartStatusComponent } from "./components/cart-status-component/cart-status-component";  // Importa el componente de estado del carrito de compras.

@Component({
  selector: 'app-root',  // Define el nombre del selector del componente, que se usará en la plantilla HTML para identificar el componente.
  standalone: true,  // Define que el componente es autónomo y no depende de otros módulos de Angular.
  imports: [CommonModule, RouterOutlet, RouterModule, ProductCategoryMenuComponent, SearchComponent, CartStatusComponent],  // Declara los módulos y otros componentes que se utilizarán dentro de este componente.
  templateUrl: './app.component.html',  // Especifica la ubicación del archivo HTML que contiene la plantilla del componente.
  styleUrls: ['./app.component.less'],  // Especifica la ubicación del archivo de estilos que se aplicarán al componente.
})
export class AppComponent {
  title = 'angular-ecommerce';  // Define la propiedad 'title', que se usará en la plantilla HTML para mostrar el título de la aplicación.
}
