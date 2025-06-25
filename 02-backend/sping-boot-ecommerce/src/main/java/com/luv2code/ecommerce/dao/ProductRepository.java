// Paquete donde se define el repositorio para acceder a la base de datos de productos.
package com.luv2code.ecommerce.dao;

// Importación de las clases necesarias para trabajar con JPA y las entidades.
import com.luv2code.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin; // Importación para habilitar CORS
import org.springframework.data.domain.Pageable;

// Anotación para permitir solicitudes CORS desde el cliente en localhost:4200
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {

    /**
     * Encuentra una lista paginada de productos por el ID de la categoría.
     *
     * @param id       ID de la categoría para filtrar productos.
     * @param pageable Parámetro de paginación.
     * @return Página de productos que pertenecen a la categoría especificada.
     */
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

    // JpaRepository ya proporciona la funcionalidad básica CRUD para la entidad Product,
    // como save(), findAll(), findById(), deleteById(), etc.
    // No es necesario implementar métodos explícitos aquí.

    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);

}
