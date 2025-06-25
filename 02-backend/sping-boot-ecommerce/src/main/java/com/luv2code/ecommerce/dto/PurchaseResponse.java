package com.luv2code.ecommerce.dto;

public class PurchaseResponse {

    private final String orderTrackingNumber; // Número de seguimiento del pedido.

    // Constructor para inicializar el número de seguimiento del pedido.
    public PurchaseResponse(String orderTrackingNumber) {
        this.orderTrackingNumber = orderTrackingNumber;
    }

    // Método getter para obtener el número de seguimiento del pedido.
    public String getOrderTrackingNumber() {
        return orderTrackingNumber;
    }
}
