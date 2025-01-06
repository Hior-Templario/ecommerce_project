import { Injectable } from '@angular/core';  // Importa el decorador Injectable para que el servicio pueda ser inyectado en otros componentes.
import { HttpClient } from '@angular/common/http';  // Importa HttpClient para realizar solicitudes HTTP al servidor.
import { Product } from '../common/product';  // Importa la clase Product para manejar los datos de los productos.
import { Observable } from 'rxjs';  // Importa Observable para manejar las respuestas asíncronas de las solicitudes HTTP.
import { map } from 'rxjs/operators';  // Importa map para transformar la respuesta de las solicitudes HTTP.
import { ProductCategory } from '../common/product-category';  // Importa la clase ProductCategory para manejar las categorías de productos.

@Injectable({
  providedIn: 'root'  // Hace que el servicio esté disponible en toda la aplicación (en el root module).
})
export class ProductService {

  // Método para obtener un producto específico por su ID.
  getProduct(theProductId: number): Observable<Product> {  
    const productUrl = `${this.baseUrl}/${theProductId}`;  // Construye la URL para obtener el producto con el ID proporcionado.
    return this.httpClient.get<Product>(productUrl);  // Realiza una solicitud HTTP GET y devuelve un Observable con el producto.
  }

  // Define la URL base para acceder a los productos.
  private baseUrl = 'http://localhost:8080/api/products';  
  // Define la URL base para acceder a las categorías de productos.
  private categoryUrl = 'http://localhost:8080/api/product-category';  

  // Constructor donde se inyecta HttpClient para realizar las solicitudes HTTP.
  constructor(private httpClient: HttpClient) { }  

  // Método para obtener una lista de productos paginados, basados en la categoría, página y tamaño de página.
  getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponseProducts> {
    // Construye la URL para la solicitud con parámetros de categoría, página y tamaño de página.
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` 
                      + `&page=${thePage}&size=${thePageSize}`;
    // Realiza la solicitud GET y devuelve un Observable con la respuesta.
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  // Método para obtener una lista de productos por categoría.
  getProductList(theCategoryId: number): Observable<Product[]> {  
    // Construye la URL para obtener los productos por categoría.
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;  
    // Llama al método privado getProducts para obtener los productos.
    return this.getProducts(searchUrl);  
  }

  // Método para buscar productos usando una palabra clave.
  searchProducts(theKeyword: string): Observable<Product[]> {  
    // Construye la URL para buscar productos por nombre que contengan la palabra clave.
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;  
    // Llama al método privado getProducts para realizar la búsqueda y devolver los productos.
    return this.getProducts(searchUrl);  
  }

  // Método privado para hacer una solicitud HTTP GET a la URL proporcionada y extraer los productos de la respuesta.
  private getProducts(searchUrl: string): Observable<Product[]> {  
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(  // Realiza la solicitud GET y recibe la respuesta.
      map(response => response._embedded.products)  // Mapea la respuesta para devolver solo los productos.
    );
  }


  // Método para buscar productos paginados usando una palabra clave.
searchProductsPaginate(
  thePage: number,        // Número de la página actual.
  thePageSize: number,    // Cantidad de elementos por página.
  theKeyWord: string      // Palabra clave para buscar productos.
): Observable<GetResponseProducts> {  
  // Construye la URL de búsqueda paginada usando la palabra clave, el número de página y el tamaño de la página.
  const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}`
                  + `&page=${thePage}&size=${thePageSize}`;

  // Realiza una solicitud HTTP GET y devuelve un Observable con la respuesta paginada.
  return this.httpClient.get<GetResponseProducts>(searchUrl);  
}

  

  // Método para obtener todas las categorías de productos.
  getProductCategories(): Observable<ProductCategory[]> {  
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(  // Realiza la solicitud GET para obtener las categorías de productos.
      map(response => response._embedded.productCategory)  // Mapea la respuesta para devolver solo las categorías.
    );
  }
}

// Interfaz que define la estructura de la respuesta para los productos.
interface GetResponseProducts {  
  _embedded: {  
    products: Product[];  // Array de productos.
  };
  page:{  // Información sobre la paginación.
    size: number,  // Tamaño de la página.
    totalElements: number,  // Total de elementos.
    totalPages: number,  // Total de páginas.
    number: number  // Número de la página actual.
  };
}

// Interfaz que define la estructura de la respuesta para las categorías de productos.
interface GetResponseProductCategory {  
  _embedded: {  
    productCategory: ProductCategory[];  // Array de categorías de productos.
  };
}
