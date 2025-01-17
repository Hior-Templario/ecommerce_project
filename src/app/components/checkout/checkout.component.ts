import { CommonModule } from '@angular/common'; // Módulo común de Angular con directivas esenciales como *ngIf y *ngFor.
import { Component, OnInit } from '@angular/core'; // Decorador para definir un componente y la interfaz OnInit para inicialización.
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Herramientas para construir formularios reactivos.
import { RouterModule } from '@angular/router'; // Módulo para la navegación de rutas en Angular.
import { Luv2shopFormService } from '../../services/luv2shop-form.service'; // Servicio personalizado para manejar datos de formularios.
import { Country } from '../../common/country'; // Modelo para los datos del país.
import { State } from '../../common/state'; // Modelo para los datos del estado.
import { Luv2ShopValidators } from '../../validators/luv2-shio-validators'; // Validadores personalizados para formularios.

@Component({
  selector: 'app-checkout', // Selector del componente para utilizarlo en plantillas HTML.
  standalone: true, // Indica que este componente puede ser utilizado de manera independiente.
  imports: [CommonModule, RouterModule, ReactiveFormsModule], // Módulos importados necesarios para el funcionamiento del componente.
  templateUrl: './checkout.component.html', // Ruta al archivo HTML del componente.
  styleUrls: ['./checkout.component.css'] // Ruta al archivo CSS del componente.
})
export class CheckoutComponent implements OnInit { // Clase principal del componente.

  checkoutFormGroup: FormGroup; // Grupo de formularios reactivos.
  
  totalPrice: number = 0; // Precio total inicializado en 0.
  totalQuantity: number = 0; // Cantidad total inicializada en 0.

  creditCardYears: number[] = []; // Años disponibles para las tarjetas de crédito.
  creditCardMonths: number[] = []; // Meses disponibles para las tarjetas de crédito.

  countries: Country[] = []; // Lista de países obtenida del servicio.

  shippingAddressStates: State[] = []; // Lista de estados para la dirección de envío.
  billingAddressStates: State[] = []; // Lista de estados para la dirección de facturación.

  constructor(
    private formBuilder: FormBuilder, // Inyección de dependencia para construir formularios.
    private luv2ShopFormService: Luv2shopFormService // Inyección del servicio para manejar datos.
  ) {}

  ngOnInit(): void {
    // Inicializa el formulario con grupos y campos anidados.
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhitespace]), // Validación del nombre.
        lastName: new FormControl('', [Validators.required,
        Validators.minLength(2),
        Luv2ShopValidators.notOnlyWhitespace]), // Validación del apellido.
        email: new FormControl('',
          [Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z-0-9.-]+\\.[a-z]{2,4}'),
          Luv2ShopValidators.notOnlyWhitespace]), // Validación del email.
      }),

      shippingAddress: this.formBuilder.group({
        street: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhitespace]), // Validación de la calle.
        city: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhitespace]), // Validación de la ciudad.
        state: new FormControl('', [Validators.required]), // Validación del estado.
        country: new FormControl('', [Validators.required]), // Validación del país.
        zipCode: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhitespace]), // Validación del código postal.
      }),

      billingAddress: this.formBuilder.group({
        country: new FormControl('', [Validators.required]), // Validación del país de facturación.
        street: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhitespace]), // Validación de la calle de facturación.
        city: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhitespace]), // Validación de la ciudad de facturación.
        state: new FormControl('', [Validators.required]), // Validación del estado de facturación.
        zipCode: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhitespace]), // Validación del código postal de facturación.
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('',
          [Validators.required,]), // Validación del tipo de tarjeta.
        nameOnCard: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhitespace]), // Validación del nombre en la tarjeta.
        cardNumber: new FormControl('',
          [Validators.required,
           Validators.pattern('[0-9]{16}')]), // Validación del número de la tarjeta.
        securityCode: new FormControl('',
          [Validators.required,
          Validators.pattern('[0-9]{3}')]), // Validación del código de seguridad.
        expirationMonth: new FormControl(''), // Mes de expiración de la tarjeta.
        expirationYear: new FormControl(''), // Año de expiración de la tarjeta.
      })
    });

    // Llama al servicio para obtener los meses disponibles para la tarjeta de crédito.
    const startMonth: number = new Date().getMonth() + 1; // Obtiene el mes actual.
    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data; // Asigna los meses obtenidos.
      }
    );

    // Llama al servicio para obtener los años disponibles para la tarjeta de crédito.
    this.luv2ShopFormService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data; // Asigna los años obtenidos.
      }
    );

    // Llama al servicio para obtener la lista de países.
    this.luv2ShopFormService.getCountries().subscribe(
      data => {
        this.countries = data; // Asigna los países obtenidos.
      }
    );
  }

  // Métodos para obtener los valores de los campos del formulario.
  get firstName(){ return this.checkoutFormGroup.get('customer.firstName');}
  get lastName(){ return this.checkoutFormGroup.get('customer.lastName');}
  get email(){ return this.checkoutFormGroup.get('customer.email');}
  
  get shippingAddressStreet(){return this.checkoutFormGroup.get('shippingAddress.street');}
  get shippingAddressCity(){return this.checkoutFormGroup.get('shippingAddress.city');}
  get shippingAddressState(){return this.checkoutFormGroup.get('shippingAddress.state');}
  get shippingAddressZipCode(){return this.checkoutFormGroup.get('shippingAddress.zipCode');}
  get shippingAddressCountry(){return this.checkoutFormGroup.get('shippingAddress.country');}

  get billingAddressStreet(){return this.checkoutFormGroup.get('billingAddress.street');}
  get billingAddressCity(){return this.checkoutFormGroup.get('billingAddress.city');}
  get billingAddressState(){return this.checkoutFormGroup.get('billingAddress.state');}
  get billingAddressZipCode(){return this.checkoutFormGroup.get('billingAddress.zipCode');}
  get billingAddressCountry(){return this.checkoutFormGroup.get('billingAddress.country');}
  
  get creditCardType(){return this.checkoutFormGroup.get('creditCard.cardType');}
  get creditCardNameCard(){return this.checkoutFormGroup.get('creditCard.nameOnCard');}
  get creditCardNumber(){return this.checkoutFormGroup.get('creditCard.cardNumber');}
  get creditCardSecurityCode(){return this.checkoutFormGroup.get('creditCard.securityCode');}

  // Método para copiar los datos de la dirección de envío a la de facturación.
  copyShippingAddressToBillingAddgress(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value); // Copia los valores de la dirección de envío.
      this.billingAddressStates = this.shippingAddressStates; // Copia los estados de la dirección de envío.
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset(); // Reinicia el formulario de facturación.
      this.billingAddressStates = []; // Vacía la lista de estados de facturación.
    }
  }

  // Método para obtener los estados según el código del país seleccionado.
  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName); // Obtiene el grupo de formulario especificado.

    const countryCode = formGroup.value.country.code; // Obtiene el código del país seleccionado.
    const countryName = formGroup.value.country.name; // Obtiene el nombre del país seleccionado.
    
    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.luv2ShopFormService.getStates(countryCode).subscribe(
      data => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data; // Asigna los estados a la dirección de envío.
        } else {
          this.billingAddressStates = data; // Asigna los estados a la dirección de facturación.
        }
        formGroup.get('state').setValue(data[0]); // Selecciona el primer estado por defecto.
      }
    );
  }

  // Método para manejar el envío del formulario.
  onSubmit() {
    console.log("Handling the submit button");

    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched(); // Marca todos los campos como tocados si el formulario es inválido.
    }

    // Muestra los datos del cliente y dirección.
    console.log(this.checkoutFormGroup.get('customer').value); 
    console.log("The email address is " + this.checkoutFormGroup.get('customer').value.email);
    console.log("the shipping address country is" + this.checkoutFormGroup.get('shippingAddress').value.country);
    console.log("the shipping address state is" + this.checkoutFormGroup.get('shippingAddress').value.state);
  }

  // Método para manejar los meses y años disponibles para la tarjeta de crédito según el año seleccionado.
  handleMonthsAndYear() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectYear: number = Number(creditCardFormGroup.value.expirationYear);
    let startMonth: number = currentYear === selectYear ? new Date().getMonth() + 1 : 1;
    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data; // Asigna los meses disponibles.
      }
    );
  }
}
