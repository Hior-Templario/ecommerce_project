package com.luv2code.ecommerce.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity // Marca la clase como una entidad JPA
@Table(name = "Order_Item") // Especifica el nombre de la tabla en la base de datos
public class OrderItem {

    @Id // Marca este campo como la clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Genera el ID automáticamente en la base de datos
    @Column(name = "id") // Mapea este campo a la columna "id"
    private Long id;

    @Column(name = "image_url") // Mapea este campo a la columna "image_url"
    private String imageUrl;

    @Column(name = "unit_price") // Mapea este campo a la columna "unit_price"
    private BigDecimal unitPrice;

    @Column(name = "quantity") // Mapea este campo a la columna "quantity"
    private int quantity;

    @Column(name = "product_id") // Mapea este campo a la columna "product_id"
    private Long productId;

    @ManyToOne // Relación muchos a uno con la entidad "Order"
    @JoinColumn(name = "order_id") // Especifica la columna "order_id" para unir esta relación
    private Order order;

    // Métodos getter y setter para acceder y modificar las propiedades de la entidad
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
