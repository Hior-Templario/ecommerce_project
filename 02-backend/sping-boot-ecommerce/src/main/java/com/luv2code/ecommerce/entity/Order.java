package com.luv2code.ecommerce.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity // Marca la clase como una entidad JPA
@Table(name = "orders") // Especifica el nombre de la tabla en la base de datos
public class Order {

    @Id // Marca este campo como la clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Genera el ID automáticamente en la base de datos
    @Column(name = "id") // Mapea este campo a la columna "id"
    private Long id;

    @Column(name = "order_tracking_number") // Mapea este campo a la columna "order_tracking_number"
    private String orderTrackingNumber;

    @Column(name = "total_quantity") // Mapea este campo a la columna "total_quantity"
    private  int totalQuantity;

    @Column(name = "total_price") // Mapea este campo a la columna "total_price"
    private BigDecimal totalPrice;

    @Column(name = "status") // Mapea este campo a la columna "status"
    private  String status;

    @Column(name = "date_created") // Mapea este campo a la columna "date_created"
    @CreationTimestamp // Marca este campo para que se establezca automáticamente en el momento de la creación
    private Date dateCreated;

    @Column(name = "last_updated") // Mapea este campo a la columna "last_updated"
    @UpdateTimestamp // Marca este campo para que se actualice automáticamente cada vez que se modifica la entidad
    private  Date lastUpdate;




    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    private Set<OrderItem> orderItems = new HashSet<>();

    @ManyToOne // Relación muchos a uno con la entidad "Customer"
    @JoinColumn(name= "customer_id") // Especifica la columna "customer_id" para unir esta relación
    private Customer customer;

    @OneToOne(cascade = CascadeType.ALL) // Relación uno a uno con la entidad "Address" para la dirección de envío
    @JoinColumn(name= "ShippingAddress_id", referencedColumnName = "id") // Especifica las columnas para la relación
    private Address ShippingAddress;

    @OneToOne(cascade = CascadeType.ALL) // Relación uno a uno con la entidad "Address" para la dirección de facturación
    @JoinColumn(name= "BillingAddress_id", referencedColumnName = "id") // Especifica las columnas para la relación
    private Address BillingAddress;

    /**
     * Método para agregar un artículo al pedido.
     * Establece también la relación bidireccional con la entidad "OrderItem".
     */
    public void add(OrderItem item) {
        if (item != null) {
            if (orderItems == null) { // Corrige la condición
                orderItems = new HashSet<>();
            }
            orderItems.add(item);
            item.setOrder(this);
        }
    }


    // Getters y setters para acceder y modificar las propiedades de la entidad
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderTrackingNumber() {
        return orderTrackingNumber;
    }

    public void setOrderTrackingNumber(String orderTrackingNumber) {
        this.orderTrackingNumber = orderTrackingNumber;
    }

    public int getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(Date lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public Set<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(Set<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Address getShippingAddress() {
        return ShippingAddress;
    }

    public void setShippingAddress(Address shippingAddress) {
        ShippingAddress = shippingAddress;
    }

    public Address getBillingAddress() {
        return BillingAddress;
    }

    public void setBillingAddress(Address billingAddress) {
        BillingAddress = billingAddress;
    }
}

