// Importa los módulos necesarios de Angular
import { Injectable } from '@angular/core'; // Necesario para usar la inyección de dependencias en Angular.
import { HttpClient } from '@angular/common/http'; // Permite realizar peticiones HTTP.
import { Product } from '../common/product'; // Importa la clase Product, que representa los productos en la aplicación.
import { Observable } from 'rxjs'; // Importa Observable para gestionar los resultados de las peticiones HTTP.
import { map } from 'rxjs/operators'; // Importa el operador 'map' para transformar los datos de la respuesta HTTP.

@Injectable({
  providedIn: 'root' // Indica que el servicio será inyectado a nivel de toda la aplicación.
})
export class ProductService {

  // URL base para la API de productos.
  private baseUrl = 'http://localhost:8080/api/products';

  // Constructor que inyecta el servicio HttpClient para realizar solicitudes HTTP.
  constructor(private httpClient: HttpClient) { }

  // Método que obtiene la lista de productos basada en el ID de categoría.
  getProductList(theCategoryId: number): Observable<Product[]> {

    // URL de búsqueda que se construye con el ID de la categoría.
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    // Realiza la solicitud GET a la API y transforma la respuesta para obtener solo la lista de productos.
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products) // Extrae los productos de la respuesta.
    );
  }
}

// Interfaz para definir la estructura de la respuesta esperada desde la API.
interface GetResponse {
  _embedded: {
    products: Product[]; // Los productos obtenidos desde la API.
  }
}
