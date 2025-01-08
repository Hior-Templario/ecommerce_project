import { bootstrapApplication } from '@angular/platform-browser'; // Función para arrancar una aplicación standalone.
import { AppComponent } from './app/app.component'; // Componente raíz de la aplicación.
import { provideHttpClient } from '@angular/common/http'; // Proveedor para el cliente HTTP.
import { provideRouter, Routes } from '@angular/router'; // Proveedor para las rutas y definición de rutas.
import { ProductListComponent } from './app/components/product-list/product-list.component'; // Componente de lista de productos.
import { ProductDetailsComponent } from './app/components/product-details/product-details.component'; // Componente de detalles del producto.
import { importProvidersFrom } from '@angular/core'; // Función para importar proveedores de un módulo Angular.
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Módulo de Bootstrap para Angular.
import { CartDetailsComponent } from './app/components/cart-details/cart-details.component';

// Definición de las rutas
const routes: Routes = [
  
  { path: 'cart-details', component: CartDetailsComponent }, // Ruta para los detalles del carrito.
  { path: 'products/:id', component: ProductDetailsComponent }, // Ruta para los detalles del producto.
  { path: 'search/:keyword', component: ProductListComponent }, // Ruta para la búsqueda de productos.
  { path: 'category/:id', component: ProductListComponent }, // Ruta para una categoría específica.
  { path: 'category', component: ProductListComponent }, // Ruta para la categoría general.
  { path: 'products', component: ProductListComponent }, // Ruta para listar todos los productos.
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // Redirección a la lista de productos por defecto.
  { path: '**', redirectTo: '/products', pathMatch: 'full' } // Redirección para rutas no encontradas.
];

// Arranca la aplicación con el componente standalone y las configuraciones necesarias.
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Proveedor para el cliente HTTP.
    provideRouter(routes), // Proveedor para las rutas definidas.
    importProvidersFrom(NgbModule) // Importa los proveedores del módulo NgbModule.
  ]
})
  .catch(err => console.error(err)); // Captura errores en caso de fallo al arrancar la aplicación.
