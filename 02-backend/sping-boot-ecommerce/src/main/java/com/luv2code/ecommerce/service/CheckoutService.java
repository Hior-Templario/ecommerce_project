package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dto.Purchase; // Importa la clase DTO Purchase, que contiene la información de la compra.
import com.luv2code.ecommerce.dto.PurchaseResponse; // Importa la clase DTO PurchaseResponse, que contiene la respuesta a la compra.

public interface CheckoutService { // Define una interfaz para el servicio de pago (CheckoutService).

    /**
     * Este método recibe un objeto de tipo Purchase, procesa la compra y devuelve una respuesta de tipo PurchaseResponse.
     *
     * @return PurchaseResponse que contiene el número de seguimiento del pedido u otra información relevante.
     */
    PurchaseResponse placeOrder(Purchase purchase); // Método abstracto que debe ser implementado en la clase de servicio concreta.
}

