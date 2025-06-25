package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

// Habilita CORS (Cross-Origin Resource Sharing) para permitir solicitudes desde el frontend en localhost:4200.
@CrossOrigin("http://localhost:4200")

// Personaliza la configuración del repositorio REST expuesto por Spring Data REST.
// - collectionResourceRel: Nombre de la colección en la respuesta JSON (aquí será "countries").
// - path: Ruta base expuesta para este recurso (aquí será "/countries").
@RepositoryRestResource(collectionResourceRel = "countries", path = "countries")
public interface CountryRepository extends JpaRepository<Country, Integer> {

    // Este repositorio hereda de JpaRepository, lo que proporciona métodos CRUD básicos para la entidad Country.
    // No se han definido métodos personalizados aquí, pero se pueden agregar si se requiere funcionalidad adicional.

}

