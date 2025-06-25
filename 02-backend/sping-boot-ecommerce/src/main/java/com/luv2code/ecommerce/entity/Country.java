package com.luv2code.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

// Marca la clase como una entidad JPA mapeada a una tabla en la base de datos.
@Entity
@Table(name = "country") // Especifica el nombre de la tabla asociada a esta entidad.
public class Country {

    // Marca este campo como la clave primaria de la tabla.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Define que el ID se genera automáticamente en la base de datos.
    @Column(name = "id") // Mapea el campo "id" de la tabla.
    private int id;

    // Mapea el campo "code" de la tabla.
    @Column(name = "code")
    private String code;

    // Mapea el campo "name" de la tabla.
    @Column(name = "name")
    private String name;

    // Define la relación uno-a-muchos con la entidad `State`.
    @OneToMany(mappedBy = "country", cascade = CascadeType.ALL)
    @JsonIgnore // Evita que esta propiedad se incluya en las respuestas JSON (para prevenir ciclos de datos).
    @JsonManagedReference // Soluciona problemas de referencia circular en la serialización de relaciones bidireccionales.
    private List<State> states;

    // Getters y setters para acceder y modificar las propiedades de la entidad.
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<State> getStates() {
        return states;
    }

    public void setStates(List<State> states) {
        this.states = states;
    }
}
