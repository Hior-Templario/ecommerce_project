import { Component } from '@angular/core';  // Importa el decorador Component para definir un componente en Angular.
import { CommonModule } from '@angular/common';  // Importa CommonModule para utilizar funcionalidades comunes de Angular como ngIf, ngFor.
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';  // Importa las directivas de enrutamiento necesarias para navegar entre componentes.
import { ProductCategoryMenuComponent } from "./components/product-category-menu/product-category-menu.component";  // Importa el componente para mostrar el menú de categorías de productos.
import { SearchComponent } from "./components/search/search.component";  // Importa el componente de búsqueda de productos.

@Component({
  selector: 'app-root',  // Define el nombre del selector del componente (se usa en la plantilla HTML).
  standalone: true,  // Define que el componente es autónomo y no depende de otros módulos.
  imports: [CommonModule, RouterOutlet, ProductCategoryMenuComponent, SearchComponent],  // Declara los módulos y componentes que se usarán en este componente.
  templateUrl: './app.component.html',  // Define la ruta del archivo HTML que contiene la plantilla del componente.
  styleUrls: ['./app.component.less'],  // Define la ruta del archivo de estilos del componente.
})
export class AppComponent {
  title = 'angular-ecommerce';  // Define la propiedad title, que se usa en la plantilla HTML.
}
