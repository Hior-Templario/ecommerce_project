// Importaciones necesarias para el servicio
import { Injectable } from '@angular/core'; // Decorador que indica que esta clase es inyectable como un servicio
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs'; // Clase de RxJS que permite manejar eventos y comunicación reactiva
import { CartItem } from '../common/cart-item'; // Modelo que representa un elemento del carrito

// Decorador que define este servicio como inyectable y accesible en toda la aplicación
@Injectable({
  providedIn: 'root' // El servicio estará disponible en el nivel raíz (singleton)
})
export class CartService {
  
  // Arreglo para almacenar los elementos del carrito
  cartItems: CartItem[] = [];

  // Subjects para manejar la transmisión de los valores totales del precio y la cantidad
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { } // Constructor vacío, ya que no se necesitan dependencias en este caso

  // Método para agregar un producto al carrito
  addToCart(theCartItem: CartItem) {

    // Variable para verificar si el artículo ya existe en el carrito
    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    // Si el carrito tiene elementos, buscamos si el artículo ya existe
    if (this.cartItems.length > 0) {
      // Busca un artículo en el carrito con el mismo ID
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

      // Si se encontró, establecemos la bandera en true
      alreadyExistInCart = (existingCartItem != undefined);
    }

    // Si el artículo ya existe en el carrito, incrementamos su cantidad
    if (alreadyExistInCart) {
      existingCartItem.quantity++; // Aumentamos la cantidad del artículo
    } else {
      // Si no existe, lo agregamos al carrito
      this.cartItems.push(theCartItem);
    }

    // Calculamos el precio total y la cantidad total del carrito
    this.computeCartTotals();
  }

  // Método para calcular el precio total y la cantidad total del carrito
  computeCartTotals() {

    let totalPriceValue: number = 0; // Variable para almacenar el precio total
    let totalQuantityValue: number = 0; // Variable para almacenar la cantidad total

    // Recorremos los elementos del carrito y acumulamos sus precios y cantidades
    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice; // Acumulamos el precio total
      totalQuantityValue += currentCartItem.quantity; // Acumulamos la cantidad total
    }

    // Publicamos los nuevos valores para que los suscriptores sean notificados
    this.totalPrice.next(totalPriceValue); // Notificamos el precio total
    this.totalQuantity.next(totalQuantityValue); // Notificamos la cantidad total

    // Registramos los datos del carrito en la consola para propósitos de depuración
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  // Método para registrar los datos del carrito en la consola
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart'); // Mensaje inicial

    // Recorremos los elementos del carrito para mostrar sus datos
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice; // Calculamos el subtotal por artículo
      console.log(`name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity}, unitPrice: ${tempCartItem.unitPrice}, subTotal: ${subTotalPrice}`);
    }

    // Mostramos el precio total y la cantidad total del carrito
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log(`----`); // Separador para mayor claridad
  }

  // Método para reducir la cantidad de un producto en el carrito
  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--; // Disminuimos la cantidad
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem); // Si la cantidad llega a cero, eliminamos el artículo
    } else {
      this.computeCartTotals(); // Si no es cero, recalculamos los totales
    }
  }

  // Método para eliminar un producto del carrito
  remove(theCartItem: CartItem) {

    // Obtiene el índice del artículo en el carrito
    const itemIndex = this.cartItems.findIndex(
      tempCartItem => tempCartItem.id == theCartItem.id); // Busca el índice del artículo por ID
  
    // Si se encuentra, eliminamos el artículo del carrito
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1); // Eliminamos el artículo en el índice encontrado
  
      // Recalculamos los totales después de la eliminación
      this.computeCartTotals();
    }
  }
}
