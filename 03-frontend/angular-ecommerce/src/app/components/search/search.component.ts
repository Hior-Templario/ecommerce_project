import { CommonModule } from '@angular/common';  // Importa el módulo común para usar directivas como ngIf, ngFor, etc.
import { Component, OnInit } from '@angular/core';  // Importa los decoradores y la interfaz necesarios para crear un componente y su ciclo de vida.
import { Router } from '@angular/router';  // Importa el Router para la navegación entre diferentes rutas de la aplicación.

@Component({
  selector: 'app-search',  // Define el nombre del selector del componente, que se usará para incluir este componente en la plantilla.
  standalone: true,  // Define el componente como autónomo (no depende de un módulo).
  imports: [CommonModule],  // Declara los módulos necesarios para el componente, en este caso el CommonModule.
  templateUrl: './search.component.html',  // Especifica el archivo HTML que contiene la plantilla del componente.
  styleUrl: './search.component.css'  // Especifica el archivo CSS que contiene los estilos del componente.
})
export class SearchComponent implements OnInit {  // Define la clase del componente que implementa OnInit para ejecutar lógica cuando el componente se inicializa.

  constructor(private router: Router) { }  // El constructor recibe una instancia del servicio Router para poder redirigir a otras rutas.

  ngOnInit() {  // Método del ciclo de vida del componente que se ejecuta cuando el componente se inicializa.
    // Lógica de inicialización si es necesario.
  }

  doSearch(value: string) {  // Método que maneja la búsqueda. Recibe un valor de búsqueda como parámetro.
    console.log(`value=${value}`);  // Muestra el valor de búsqueda en la consola.
    this.router.navigateByUrl(`/search/${value}`);  // Redirige a la ruta de búsqueda, pasando el valor como parámetro en la URL.
  }
}
