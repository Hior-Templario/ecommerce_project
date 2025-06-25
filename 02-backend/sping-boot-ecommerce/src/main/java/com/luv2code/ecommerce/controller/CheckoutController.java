package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dto.Purchase; // Importa el DTO de la compra.
import com.luv2code.ecommerce.dto.PurchaseResponse; // Importa el DTO de respuesta de la compra.
import com.luv2code.ecommerce.service.CheckoutService; // Importa el servicio de checkout.
import org.springframework.web.bind.annotation.*; // Importa las anotaciones para los controladores de Spring.

@CrossOrigin("http://localhost:4200") // Permite solicitudes CORS desde el frontend (Angular por defecto en el puerto 4200).
@RestController // Marca la clase como un controlador REST.
@RequestMapping("/api/checkout") // Establece la ruta base para las solicitudes de este controlador.
public class CheckoutController {

    private final CheckoutService checkoutService; // Inyecta el servicio de checkout.

    // Constructor que inyecta el servicio de checkout.
    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }

    // Método para manejar las solicitudes POST en "/api/checkout/purchase".
    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){

        // Llama al servicio de checkout para procesar el pedido.
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

        // Devuelve la respuesta del pedido con el número de seguimiento.
        return purchaseResponse;
    }
}

