import { CommonModule } from '@angular/common'; // Módulo común de Angular con directivas esenciales como *ngIf y *ngFor.
import { Component, OnInit } from '@angular/core'; // Decorador para definir un componente y la interfaz OnInit para inicialización.
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Herramientas para construir formularios reactivos.
import { RouterModule } from '@angular/router'; // Módulo para la navegación de rutas en Angular.
import { Luv2shopFormService } from '../../services/luv2shop-form.service'; // Servicio personalizado para manejar datos de formularios.
import { Country } from '../../common/country'; // Modelo para los datos del país.
import { State } from '../../common/state'; // Modelo para los datos del estado.

@Component({
  selector: 'app-checkout', // Selector del componente para utilizarlo en plantillas HTML.
  standalone: true, // Indica que este componente puede ser utilizado de manera independiente.
  imports: [CommonModule, RouterModule, ReactiveFormsModule], // Módulos importados necesarios para el funcionamiento del componente.
  templateUrl: './checkout.component.html', // Ruta al archivo HTML del componente.
  styleUrls: ['./checkout.component.css'] // Ruta al archivo CSS del componente.
})
export class CheckoutComponent implements OnInit { // Clase principal del componente.

  checkoutFormGroup: FormGroup; // Grupo de formularios reactivos.
  shippingAddressStates: State[] = []; // Lista de estados para la dirección de envío.
  billingAddressStates: State[] = []; // Lista de estados para la dirección de facturación.

  totalPrice: number = 0; // Precio total inicializado en 0.
  totalQuantity: number = 0; // Cantidad total inicializada en 0.

  creditCardYears: number[] = []; // Años disponibles para las tarjetas de crédito.
  creditCardMonths: number[] = []; // Meses disponibles para las tarjetas de crédito.

  countries: Country[] = []; // Lista de países obtenida del servicio.

  constructor(
    private formBuilder: FormBuilder, // Inyección de dependencia para construir formularios.
    private luv2ShopFormService: Luv2shopFormService // Inyección del servicio para manejar datos.
  ) {}

  ngOnInit(): void {
    // Inicializa el formulario con grupos y campos anidados.
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''], // Campo para el primer nombre del cliente.
        lastName: [''], // Campo para el apellido del cliente.
        email: [''] // Campo para el correo electrónico del cliente.
      }),
      shippingAddress: this.formBuilder.group({
        country: [''], // Campo para el país de envío.
        street: [''], // Campo para la calle de envío.
        city: [''], // Campo para la ciudad de envío.
        state: [''], // Campo para el estado de envío.
        zipCode: [''] // Campo para el código postal de envío.
      }),
      billingAddress: this.formBuilder.group({
        country: [''], // Campo para el país de facturación.
        street: [''], // Campo para la calle de facturación.
        city: [''], // Campo para la ciudad de facturación.
        state: [''], // Campo para el estado de facturación.
        zipCode: [''] // Campo para el código postal de facturación.
      }),
      creditCard: this.formBuilder.group({
        cardType: [''], // Campo para el tipo de tarjeta.
        nameOnCard: [''], // Campo para el nombre en la tarjeta.
        cardNumber: [''], // Campo para el número de la tarjeta.
        securityCode: [''], // Campo para el código de seguridad.
        expirationMonth: [''], // Campo para el mes de expiración.
        expirationYear: [''] // Campo para el año de expiración.
      })
    });

    // Llama al servicio para obtener los meses disponibles para la tarjeta de crédito.
    const startMonth: number = new Date().getMonth() + 1; // Obtiene el mes actual.
    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data; // Asigna los datos obtenidos.
      }
    );

    // Llama al servicio para obtener los años disponibles para la tarjeta de crédito.
    this.luv2ShopFormService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data; // Asigna los datos obtenidos.
      }
    );

    // Llama al servicio para obtener la lista de países.
    this.luv2ShopFormService.getCountries().subscribe(
      data => {
        this.countries = data; // Asigna los datos obtenidos.
      }
    );
  }

  // Método para obtener los estados según el código del país seleccionado.
  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName); // Obtiene el grupo de formulario especificado.
    const countryCode = formGroup.value.country.code; // Obtiene el código del país.
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

  // Método para copiar los datos de la dirección de envío a la de facturación.
  copyShippingAddressToBillingAddgress(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value); // Copia los valores.
      this.billingAddressStates = this.shippingAddressStates; // Copia los estados.
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset(); // Reinicia el formulario.
      this.billingAddressStates = []; // Vacía los estados de facturación.
    }
  }

  // Método para manejar el envío del formulario.
  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer').value); // Muestra los datos del cliente.
  }

  // Maneja los meses y años disponibles para la tarjeta de crédito según el año seleccionado.
  handleMonthsAndYear() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectYear: number = Number(creditCardFormGroup.value.expirationYear);
    let startMonth: number = currentYear === selectYear ? new Date().getMonth() + 1 : 1;
    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );
  }
}
