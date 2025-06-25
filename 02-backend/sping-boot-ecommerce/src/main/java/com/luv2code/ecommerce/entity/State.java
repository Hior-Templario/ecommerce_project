package com.luv2code.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

// Marca la clase como una entidad JPA mapeada a una tabla en la base de datos.
@Entity
@Table(name = "state") // Especifica el nombre de la tabla asociada a esta entidad.
public class State {

    // Marca este campo como la clave primaria de la tabla.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Define que el ID se genera automáticamente en la base de datos.
    @Column(name = "id") // Mapea el campo "id" de la tabla.
    private int id;

    // Mapea el campo "name" de la tabla.
    @Column(name = "name") // Especifica que el campo "name" se corresponde con una columna en la tabla "state".
    private String name;

    // Define la relación muchos-a-uno con la entidad `Country`.
    @ManyToOne
    @JoinColumn(name = "country_id") // Especifica la columna de la tabla que actúa como clave foránea.
    @JsonBackReference // Evita referencias circulares al serializar esta relación en JSON. Esto es útil para prevenir bucles infinitos cuando se convierten objetos en JSON.
    private Country country;

    // Getters y setters para acceder y modificar las propiedades de la entidad.

    public int getId() {
        return id; // Devuelve el valor del ID de este estado.
    }

    public void setId(int id) {
        this.id = id; // Establece el valor del ID de este estado.
    }

    public String getName() {
        return name; // Devuelve el nombre del estado.
    }

    public void setName(String name) {
        this.name = name; // Establece el nombre del estado.
    }

    public Country getCountry() {
        return country; // Devuelve el país al que pertenece este estado.
    }

    public void setCountry(Country country) {
        this.country = country; // Establece el país al que pertenece este estado.
    }
}
