export class ProductCategory {  
    // Define una clase llamada "ProductCategory" que será exportada para ser utilizada en otros archivos.
    // Representa una categoría de producto con un identificador y un nombre.

    constructor(
        public id: number, 
        // Define un parámetro llamado "id" que representa el identificador único de la categoría. Es de tipo número.
        
        public categoryName: string 
        // Define un parámetro llamado "categoryName" que representa el nombre de la categoría. Es de tipo cadena.
    ) {
        // El constructor utiliza un acceso directo de TypeScript para inicializar automáticamente las propiedades "id" y "categoryName".
    }
}
