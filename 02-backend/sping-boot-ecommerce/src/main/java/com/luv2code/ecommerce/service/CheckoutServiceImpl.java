package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dao.CustomerRepository; // Importa el repositorio de clientes para realizar operaciones con la base de datos.
import com.luv2code.ecommerce.dto.Purchase; // Importa el DTO Purchase que contiene la información de la compra.
import com.luv2code.ecommerce.dto.PurchaseResponse; // Importa el DTO PurchaseResponse que contiene la respuesta del pedido.
import com.luv2code.ecommerce.entity.Customer; // Importa la entidad Customer.
import com.luv2code.ecommerce.entity.Order; // Importa la entidad Order (pedido).
import com.luv2code.ecommerce.entity.OrderItem; // Importa la entidad OrderItem (artículo del pedido).
import jakarta.transaction.Transactional; // Anotación que indica que el método es transaccional.
import org.springframework.stereotype.Service; // Anotación para marcar la clase como un servicio en Spring.

import java.util.Set; // Importa Set para coleccionar elementos sin duplicados.
import java.util.UUID; // Importa la clase UUID para generar identificadores únicos.

@Service // Marca la clase como un servicio de Spring.
public class CheckoutServiceImpl implements CheckoutService {

    private final CustomerRepository customerRepository; // Repositorio para interactuar con la base de datos de clientes.

    // Constructor para inyectar el repositorio de clientes.
    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    /**
     * Procesa una compra y guarda la información en la base de datos.
     *
     * @param purchase Objeto DTO que contiene la información de la compra.
     * @return PurchaseResponse que contiene el número de seguimiento del pedido.
     */
    @Override
    @Transactional // Indica que este método debe ser ejecutado dentro de una transacción.
    public PurchaseResponse placeOrder(Purchase purchase) {

        // Recupera la información del pedido desde el DTO de compra.
        Order order = purchase.getOrder();

        // Genera un número de seguimiento único para el pedido.
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // Rellena el pedido con los artículos del pedido.
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        // Asigna las direcciones de facturación y envío al pedido.
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        // Asocia el pedido al cliente.
        Customer customer = purchase.getCustomer();
        customer.add(order);

        // Guarda el cliente con su pedido en la base de datos.
        customerRepository.save(customer);

        // Devuelve una respuesta con el número de seguimiento del pedido.
        return new PurchaseResponse(orderTrackingNumber);
    }

    /**
     * Genera un número de seguimiento único utilizando un UUID.
     *
     * @return Un número de seguimiento generado de manera única.
     */
    private String generateOrderTrackingNumber() {
        // Genera un número UUID aleatorio (versión 4 de UUID).
        return UUID.randomUUID().toString(); // Devuelve el UUID generado como una cadena.
    }
}
