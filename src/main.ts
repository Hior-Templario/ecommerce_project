// Importa las funciones y módulos necesarios desde Angular
import { bootstrapApplication } from '@angular/platform-browser'; // Para arrancar la aplicación en Angular
import { AppComponent } from './app/app.component'; // Componente principal de la aplicación
import { provideHttpClient } from '@angular/common/http'; // Proveedor para realizar peticiones HTTP
import { provideRouter, Routes } from '@angular/router'; // Proveedores y tipado para gestionar rutas en Angular
import { ProductListComponent } from './app/components/product-list/product-list.component'; // Componente que muestra la lista de productos

// Definición de las rutas de la aplicación
const routes: Routes = [
  { path: 'category/:id', component: ProductListComponent }, // Ruta dinámica que muestra productos de una categoría específica según su ID
  { path: 'category', component: ProductListComponent }, // Ruta que muestra productos de una categoría general
  { path: 'products', component: ProductListComponent }, // Ruta que muestra la lista de todos los productos
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // Ruta vacía (inicio), redirige automáticamente a '/products'
  { path: '**', redirectTo: '/products', pathMatch: 'full' } // Ruta comodín, redirige a '/products' para rutas no definidas
];

// Arranca la aplicación utilizando el componente principal (AppComponent)
// y configura los proveedores necesarios
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Proveedor para las peticiones HTTP
    provideRouter(routes), // Proveedor para las rutas definidas anteriormente
  ]
})
  .catch(err => console.error(err)); // Manejo de errores si la aplicación no puede arrancar
