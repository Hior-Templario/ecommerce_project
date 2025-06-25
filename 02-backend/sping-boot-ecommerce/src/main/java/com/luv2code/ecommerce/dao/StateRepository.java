package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

// Habilita CORS (Cross-Origin Resource Sharing) para permitir solicitudes desde el frontend en localhost:4200.
@CrossOrigin("http://localhost:4200")

// Anotación para personalizar la configuración del repositorio REST.
// - collectionResourceRel: Nombre de la colección que aparece en la respuesta JSON.
// - path: Ruta base expuesta para acceder a los datos de esta entidad.
@RepositoryRestResource(collectionResourceRel = "states", path = "states")
public interface StateRepository extends JpaRepository<State, Integer> {

    // Método de consulta personalizada para buscar estados por el código de país.
    // @Param: Vincula el parámetro "code" de la consulta HTTP a este método.
    List<State> findByCountryCode(@Param("code") String code);

}
