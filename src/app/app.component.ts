import { Component } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component'
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'angular-ecommerce';
}
