package com.luv2code.ecommerce.entity;

import jakarta.persistence.*; // JPA imports
import java.util.Set; // Importa la clase Set

@Entity // Marca la clase como una entidad JPA, lo que significa que esta clase se mapeá a una tabla en la base de datos.
@Table(name = "product_category") // Especifica el nombre de la tabla en la base de datos a la que se mapea la clase.
public class ProductCategory {

    @Id // Indica que este campo es la clave primaria de la entidad.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Utiliza la estrategia de auto-incremento para generar el valor del campo "id".
    @Column(name = "id") // Mapea este campo a la columna "id" de la tabla en la base de datos.
    private Long id;

    @Column(name = "category_name") // Mapea el campo "categoryName" a la columna "category_name" en la base de datos.
    private String categoryName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category") // Define una relación uno a muchos con la clase Product.
    private Set<Product> products; // Colección de productos asociados a esta categoría.

    // Métodos getter y setter para los atributos de la clase.
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
}

