import { Injectable } from '@angular/core';  // Importa el decorador Injectable para que el servicio pueda ser inyectado.
import { HttpClient } from '@angular/common/http';  // Importa HttpClient para realizar solicitudes HTTP.
import { Product } from '../common/product';  // Importa la clase Product para los tipos de productos.
import { Observable } from 'rxjs';  // Importa Observable para manejar las respuestas asíncronas.
import { map } from 'rxjs/operators';  // Importa map para transformar la respuesta de la petición.
import { ProductCategory } from '../common/product-category';  // Importa la clase ProductCategory para las categorías de productos.

@Injectable({
  providedIn: 'root'  // Hace que el servicio esté disponible en toda la aplicación.
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';  // Define la URL base para acceder a los productos.
  private categoryUrl = 'http://localhost:8080/api/product-category';  // Define la URL para acceder a las categorías de productos.

  constructor(private httpClient: HttpClient) { }  // Inyecta HttpClient para realizar solicitudes HTTP.

  getProductList(theCategoryId: number): Observable<Product[]> {  // Método para obtener la lista de productos de una categoría.
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;  // Construye la URL de búsqueda de productos por categoría.
    return this.getProducts(searchUrl);  // Llama al método privado getProducts para realizar la solicitud y obtener los productos.
  }

  searchProducts(theKeyword: string): Observable<Product[]> {  // Método para buscar productos por palabra clave.
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;  // Construye la URL para buscar productos por nombre.
    return this.getProducts(searchUrl);  // Llama al método privado getProducts para obtener los productos que coinciden con la búsqueda.
  }

  private getProducts(searchUrl: string): Observable<Product[]> {  // Método privado para hacer la solicitud HTTP a la URL proporcionada.
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(  // Realiza la solicitud HTTP GET y recibe la respuesta.
      map(response => response._embedded.products)  // Mapea la respuesta para devolver solo los productos.
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {  // Método para obtener todas las categorías de productos.
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(  // Realiza la solicitud GET para obtener las categorías.
      map(response => response._embedded.productCategory)  // Mapea la respuesta para devolver solo las categorías de productos.
    );
  }
}

// Interfaz para el tipo de respuesta de productos.
interface GetResponseProducts {
  _embedded: {
    products: Product[];  // Define la estructura de la respuesta para los productos.
  };
}

// Interfaz para el tipo de respuesta de categorías de productos.
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];  // Define la estructura de la respuesta para las categorías de productos.
  };
}
