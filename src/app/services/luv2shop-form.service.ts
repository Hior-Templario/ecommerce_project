import { HttpClient } from '@angular/common/http'; // Importa el cliente HTTP de Angular para realizar solicitudes HTTP.
import { Injectable } from '@angular/core'; // Importa el decorador Injectable para declarar que esta clase es un servicio.
import { map, Observable } from 'rxjs'; // Importa operadores y clases de RxJS para manejar flujos de datos reactivos.
import { of } from 'rxjs/internal/observable/of'; // Importa 'of' para crear flujos de datos a partir de valores.
import { Country } from '../common/country'; // Importa el modelo de datos Country.
import { State } from '../common/state'; // Importa el modelo de datos State.

@Injectable({
  providedIn: 'root' // Marca este servicio como disponible a nivel de raíz (singleton).
})
export class Luv2shopFormService {

  private countriesUrl = 'http://localhost:8080/api/countries'; // URL para obtener la lista de países.
  private statesUrl = 'http://localhost:8080/api/states'; // URL para obtener la lista de estados.

  constructor(private httpClient: HttpClient) {} // Constructor para inyectar el cliente HTTP.

  // Método para obtener la lista de países desde el backend.
  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries) // Mapea la respuesta para devolver solo la lista de países.
    );
  }

  // Método para obtener los estados basados en el código del país proporcionado.
  getStates(theCountryCode: string): Observable<State[]> {
    // Construye la URL de búsqueda con el código del país.
    const searchStateUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient.get<GetResponseStates>(searchStateUrl).pipe(
      map(response => response._embedded.states) // Mapea la respuesta para devolver solo la lista de estados.
    );
  }

  // Método para generar los meses de una tarjeta de crédito a partir de un mes inicial.
  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = []; // Inicializa el arreglo para los meses.
    // Construye un arreglo con los meses desde el mes inicial hasta diciembre.
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth); // Agrega el mes actual al arreglo.
    }
    return of(data); // Retorna los meses como un Observable.
  }

  // Método para generar los próximos 10 años desde el año actual.
  getCreditCardYears(): Observable<number[]> {
    let data: number[] = []; // Inicializa el arreglo para los años.
    const startYear: number = new Date().getFullYear(); // Obtiene el año actual.
    const endYear: number = startYear + 10; // Define el último año como el actual + 10.

    // Construye un arreglo con los años desde el año actual hasta el año final.
    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear); // Agrega el año actual al arreglo.
    }
    return of(data); // Retorna los años como un Observable.
  }
}

// Interfaz para la estructura de la respuesta del API al obtener países.
interface GetResponseCountries {
  _embedded: {
    countries: Country[]; // Lista de países.
  };
}

// Interfaz para la estructura de la respuesta del API al obtener estados.
interface GetResponseStates {
  _embedded: {
    states: State[]; // Lista de estados.
  };
}
