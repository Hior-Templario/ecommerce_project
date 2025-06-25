import { HttpClient } from '@angular/common/http'; // Importación del módulo HttpClient para realizar solicitudes HTTP.
import { Injectable } from '@angular/core'; // Importación del decorador Injectable, que permite inyectar esta clase como servicio.
import { Purchase } from '../common/purchase'; // Importación de la clase Purchase, que representa el modelo de datos de la compra.
import { Observable } from 'rxjs'; // Importación del tipo Observable, utilizado para manejar flujos de datos asincrónicos.

@Injectable({
  providedIn: 'root' // El servicio se proporciona a nivel global de la aplicación.
})
export class CheckoutService { // Definición de la clase CheckoutService, que se encargará de manejar las compras.

  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase'; // URL del backend para procesar las solicitudes de compra.

  constructor(private httpClient: HttpClient) { } // Constructor que inyecta HttpClient para realizar las solicitudes HTTP.

  placeOrder(purchase: Purchase): Observable<any> { // Método que envía los datos de una compra al servidor y devuelve un Observable con la respuesta.
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase); // Realiza una solicitud POST al servidor con el objeto Purchase y la URL especificada.
  }
}
