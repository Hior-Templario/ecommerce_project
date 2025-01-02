// Importación del módulo `Routes` desde `@angular/router`, utilizado para definir las rutas de la aplicación.
import { Routes } from '@angular/router'; 

// Importación del componente `ProductListComponent`, que se usará en varias rutas.
import { ProductListComponent } from './components/product-list/product-list.component';

// Definición de las rutas para la aplicación.
export const routes: Routes = [
    // Ruta para categorías específicas. El parámetro dinámico `id` representa el identificador de una categoría.
    { path: 'category/:id', component: ProductListComponent },

    // Ruta para todas las categorías sin un identificador específico.
    { path: 'category', component: ProductListComponent },

    // Ruta para la lista de productos. Muestra el `ProductListComponent`.
    { path: 'products', component: ProductListComponent },

    // Redirección de la ruta base ('') a `/products`. `pathMatch: 'full'` asegura que se haga la coincidencia exacta de la ruta.
    { path: '', redirectTo: '/products', pathMatch: 'full' },

    // Redirección para rutas no definidas (comodín) a `/products`.
    { path: '**', redirectTo: '/products', pathMatch: 'full' }
];
