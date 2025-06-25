package com.luv2code.ecommerce.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity // Indica que esta clase es una entidad JPA
@Table(name = "product") // Mapea la clase a la tabla "product" en la base de datos
public class Product {

    @Id // Indica que este campo es la clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Generación automática del ID en la base de datos
    private Long id;

    @ManyToOne // Relación muchos a uno con la entidad ProductCategory
    @JoinColumn(name = "category_id", nullable = false) // Establece la columna "category_id" como clave foránea
    private ProductCategory category;

    @Column(name = "sku") // Mapea la columna "sku" para el código de producto
    private String sku;

    @Column(name = "name") // Mapea la columna "name" para el nombre del producto
    private String name;

    @Column(name = "description") // Mapea la columna "description" para la descripción del producto
    private String description;

    @Column(name = "unit_price") // Mapea la columna "unit_price" para el precio unitario
    private BigDecimal unitPrice;

    @Column(name = "image_url") // Mapea la columna "image_url" para la URL de la imagen del producto
    private String imageUrl;

    @Column(name = "active") // Mapea la columna "active" para el estado de disponibilidad del producto
    private boolean active;

    @Column(name = "units_in_stock") // Mapea la columna "units_in_stock" para la cantidad en inventario
    private int unitsInStock;

    @Column(name = "date_created") // Mapea la columna "date_created" para la fecha de creación
    @CreationTimestamp // Marca este campo para que se rellene automáticamente con la fecha de creación
    private Date dateCreated;

    @Column(name = "last_updated") // Mapea la columna "last_updated" para la fecha de la última actualización
    @UpdateTimestamp // Marca este campo para que se actualice automáticamente con la fecha de la última modificación
    private Date lastUpdated;

    // Métodos getter y setter para acceder y modificar las propiedades de la entidad
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProductCategory getCategory() {
        return category;
    }

    public void setCategory(ProductCategory category) {
        this.category = category;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public int getUnitsInStock() {
        return unitsInStock;
    }

    public void setUnitsInStock(int unitsInStock) {
        this.unitsInStock = unitsInStock;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
