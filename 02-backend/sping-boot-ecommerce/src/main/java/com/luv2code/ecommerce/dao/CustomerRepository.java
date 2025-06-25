package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Customer; // Importa la entidad Customer
import org.springframework.data.jpa.repository.JpaRepository; // Importa JpaRepository para realizar operaciones CRUD
import org.springframework.data.rest.core.annotation.RepositoryRestResource; // Permite crear recursos REST automáticamente
import org.springframework.web.bind.annotation.CrossOrigin; // Permite habilitar CORS (Cross-Origin Resource Sharing)

@CrossOrigin("http://localhost:4200") // Permite solicitudes desde el frontend en el puerto 4200 (Angular por defecto)
@RepositoryRestResource(collectionResourceRel = "customers", path = "customers") // Configura el nombre de los recursos REST y su ruta
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    // JpaRepository proporciona operaciones CRUD automáticas para la entidad Customer
}
