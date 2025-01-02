// Importa los módulos necesarios para la aplicación.
import { Component } from '@angular/core'; // Importa el decorador Component de Angular.
import { CommonModule } from '@angular/common'; // Importa CommonModule, que proporciona directivas comunes de Angular.
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; // Importa los módulos de router para manejar la navegación en la aplicación.

@Component({
  selector: 'app-root', // Define el nombre del selector para este componente (etiqueta HTML personalizada).
  standalone: true, // Indica que este componente es "independiente" y no depende de un módulo específico.
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive], // Especifica los módulos que deben ser importados en este componente.
  templateUrl: './app.component.html', // Ruta del archivo HTML que define la vista de este componente.
  styleUrls: ['./app.component.less'], // Ruta del archivo LESS que define los estilos de este componente.
})
export class AppComponent {
  title = 'angular-ecommerce'; // Propiedad de la clase que guarda el título de la aplicación.
}
