import { FormControl, ValidationErrors } from "@angular/forms";

export class Luv2ShopValidators  {

    // Validación para verificar si el valor no contiene solo espacios en blanco
    static notOnlyWhitespace(control: FormControl) : ValidationErrors {
        
        // Verifica si el valor del control no es nulo y si el valor contiene solo espacios en blanco
        if ((control.value != null) && (control.value.trim().length === 0)) {
 
            // Si contiene solo espacios en blanco, es inválido, por lo que se retorna un objeto de error
            return { 'notOnlyWhitespace': true };
        }
        else {
            // Si el valor contiene caracteres distintos a los espacios en blanco, es válido
            return null;
        }
    }

}
