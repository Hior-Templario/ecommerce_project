package com.luv2code.ecommerce.entity;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity // Marca la clase como una entidad JPA
@Table(name ="customer") // Especifica el nombre de la tabla en la base de datos
public class Customer {

    @Id // Marca este campo como la clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Genera el ID automáticamente en la base de datos
    @Column(name = "id") // Mapea este campo a la columna "id"
        private Long id;

    @Column(name = "first_name") // Mapea este campo a la columna "first_name"
    private String firstName;

    @Column(name = "last_name") // Mapea este campo a la columna "last_name"
    private String lastname;

    @Column(name = "email") // Mapea este campo a la columna "email"
    private String email;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL) // Relación uno a muchos con la entidad "Order"
    private Set<Order> orders; // Colección de órdenes asociadas a este cliente

    /**
     * Método para añadir un pedido al cliente.
     * Si el conjunto de pedidos es nulo, se inicializa como un HashSet.
     * Además, se establece la relación bidireccional con la entidad "Order".
     */
    public void add(Order order){
        if(order != null){
            if(orders == null){
                orders = new HashSet<>();
            }
            orders.add(order);
            order.setCustomer(this); // Establece la relación inversa
        }
    }

    // Getters y setters para acceder y modificar las propiedades de la entidad
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Order> getOrders() {
        return orders;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }
}

