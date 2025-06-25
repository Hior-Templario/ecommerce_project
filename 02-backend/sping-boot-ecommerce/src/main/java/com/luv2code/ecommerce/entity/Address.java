package com.luv2code.ecommerce.entity;

import jakarta.persistence.*;

@Entity // Marca la clase como una entidad JPA
@Table(name = "address") // Especifica el nombre de la tabla en la base de datos
public class Address {

    @Id // Marca este campo como la clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Genera el ID automáticamente
    @Column(name = "id") // Mapea este campo a la columna "id"
    private int id;

    @Column(name = "city") // Mapea este campo a la columna "city"
    private String city;

    @Column(name = "country") // Mapea este campo a la columna "country"
    private String country;

    @Column(name = "state") // Mapea este campo a la columna "state"
    private String state;

    @Column(name = "street") // Mapea este campo a la columna "street"
    private String street;

    @Column(name = "zip_code") // Mapea este campo a la columna "zip_code"
    private String zipCode;

    @OneToOne // Relación uno a uno con la entidad "Order"
    @PrimaryKeyJoinColumn // Establece la clave primaria de la relación
    private Order order; // Objeto "Order" asociado a la dirección

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
