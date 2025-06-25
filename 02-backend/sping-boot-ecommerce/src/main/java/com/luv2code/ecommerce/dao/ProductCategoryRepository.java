package com.luv2code.ecommerce.dao; // Declara el paquete en el que se encuentra esta clase

// Importa la clase ProductCategory que es la entidad que vamos a manipular.
import com.luv2code.ecommerce.entity.ProductCategory;

// Importa JpaRepository que es una interfaz proporcionada por Spring Data JPA para realizar operaciones CRUD.
import org.springframework.data.jpa.repository.JpaRepository;

// Importa RepositoryRestResource que se usa para exponer automáticamente los repositorios como APIs RESTful.
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

// Esta anotación expone el repositorio como un servicio REST. Los parámetros especifican cómo se presentarán los recursos.
@RepositoryRestResource(
        collectionResourceRel = "productCategory", // Este es el nombre del recurso al que se accederá, en plural, a través de la API REST.
        path = "product-category" // Este es el nombre del endpoint (ruta) para acceder a las categorías de productos, en singular.
)
// Anotación para permitir solicitudes CORS desde el cliente en localhost:4200
@CrossOrigin("http://localhost:4200")

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    // Esta interfaz hereda de JpaRepository, lo que le otorga métodos básicos como:
    // - save() para guardar un objeto en la base de datos.
    // - findById() para encontrar una categoría por su ID.
    // - findAll() para obtener todas las categorías.
    // - deleteById() para eliminar una categoría por su ID.
    // El primer parámetro indica el tipo de entidad, en este caso ProductCategory.
    // El segundo parámetro es el tipo de la clave primaria (id), en este caso Long.
}
