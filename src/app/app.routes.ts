// Importación del módulo `Routes` desde `@angular/router`, utilizado para definir las rutas de la aplicación.
import { Routes } from '@angular/router';  

// Importación del componente `ProductListComponent`, que se usará en varias rutas para mostrar listas de productos.
import { ProductListComponent } from './components/product-list/product-list.component';  
import { ProductDetailsComponent } from './components/product-details/product-details.component';  // Importación del componente para mostrar los detalles de un producto.


// Definición de las rutas para la aplicación.
export const routes: Routes = [  

    // Ruta para mostrar los detalles de un producto, con el ID del producto como parámetro de la URL.
    {path: 'products/:id', component: ProductDetailsComponent},  

    // Ruta para buscar productos por palabra clave. El parámetro `keyword` se captura de la URL y se pasa al componente.
    {path: 'search/:keyword', component: ProductListComponent},  

    // Ruta para listar los productos de una categoría específica. El parámetro `id` representa el identificador de la categoría.
    { path: 'category/:id', component: ProductListComponent },  

    // Ruta para mostrar todos los productos de todas las categorías sin necesidad de un identificador específico.
    { path: 'category', component: ProductListComponent },  

    // Ruta para la lista de productos sin ningún filtro. Muestra todos los productos.
    { path: 'products', component: ProductListComponent },  

    // Redirección de la ruta base ('') a `/products`. `pathMatch: 'full'` asegura que se haga la coincidencia exacta de la ruta.
    { path: '', redirectTo: '/products', pathMatch: 'full' },  

    // Redirección para cualquier ruta no definida (comodín) a `/products`, mostrando la lista de productos por defecto.
    { path: '**', redirectTo: '/products', pathMatch: 'full' }  
];
