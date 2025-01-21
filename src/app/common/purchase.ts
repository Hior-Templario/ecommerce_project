import { Address } from "./address";
// Importa la clase "Address" desde el archivo local "address". Esta clase probablemente representa una dirección postal.

import { Customer } from "./customer";
// Importa la clase "Customer" desde el archivo local "customer". Representa al cliente que realiza la compra.

import { Order } from "./order";
// Importa la clase "Order" desde el archivo local "order". Contiene detalles generales sobre el pedido.

import { OrderItem } from "./order-item";
// Importa la clase "OrderItem" desde el archivo local "order-item". Representa los artículos individuales que forman parte del pedido.

export class Purchase {
    // Define una clase llamada "Purchase" que será exportada para ser utilizada en otros archivos.
    // Representa una compra completa, que incluye cliente, direcciones, pedido y artículos.

    customer: Customer;
    // Propiedad "customer" que almacena la información del cliente que realiza la compra. Es de tipo "Customer".

    billingAddress: Address;
    // Propiedad "billingAddress" que almacena la dirección de facturación. Es de tipo "Address".

    shippingAddress: Address;
    // Propiedad "shippingAddress" que almacena la dirección de envío. Es de tipo "Address".

    order: Order;
    // Propiedad "order" que almacena los detalles generales del pedido, como el precio total y la cantidad total. Es de tipo "Order".

    orderItems: OrderItem[];
    // Propiedad "orderItems" que almacena una lista de los artículos incluidos en el pedido. Es un array de objetos de tipo "OrderItem".

}
