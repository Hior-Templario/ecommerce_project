package com.luv2code.ecommerce.config;

import com.luv2code.ecommerce.entity.Country;
import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;
import com.luv2code.ecommerce.entity.State;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

// Marca esta clase como una clase de configuración en Spring.
@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private final EntityManager entityManager;

    // Constructor que inyecta el EntityManager.
    // El EntityManager se utiliza para acceder al metamodelo de entidades de JPA.
    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager) {
        this.entityManager = theEntityManager;
    }

    // Sobrescribe el método para configurar la exposición de repositorios REST.
    // Este método deshabilita ciertos métodos HTTP para las entidades especificadas
    // y expone los IDs de todas las entidades.
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        // Define un arreglo con los métodos HTTP que estarán deshabilitados para ciertas entidades.
        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

        // Deshabilita métodos HTTP no deseados para las entidades especificadas.
        disableHttpMehods(Product.class, config, theUnsupportedActions);
        disableHttpMehods(ProductCategory.class, config, theUnsupportedActions);
        disableHttpMehods(Country.class, config, theUnsupportedActions);
        disableHttpMehods(State.class, config, theUnsupportedActions);

        // Expone los IDs de todas las entidades en el sistema.
        exposeIds(config);
    }

    // Deshabilita métodos HTTP específicos para una entidad.
    private void disableHttpMehods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass) // Configura las reglas para el tipo de dominio especificado.
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions)) // Deshabilita los métodos para operaciones individuales.
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions)); // Deshabilita los métodos para operaciones sobre colecciones.
    }

    // Expone los IDs de todas las entidades gestionadas por el EntityManager.
    // Esto permite que los clientes REST vean los IDs de las entidades en las respuestas JSON.
    private void exposeIds(RepositoryRestConfiguration config) {

        // Obtiene todas las entidades del modelo administrado por el EntityManager.
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // Crea una lista para almacenar las clases de las entidades.
        List<Class> entityClasses = new ArrayList<>();

        // Itera sobre las entidades y extrae el tipo de clase Java asociado.
        for (EntityType<?> tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }

        // Convierte la lista de clases a un arreglo.
        Class[] domainTypes = entityClasses.toArray(new Class[0]);

        // Configura la exposición de los IDs para todas las entidades.
        config.exposeIdsFor(domainTypes);
    }
}
