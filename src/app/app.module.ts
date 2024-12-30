import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    AppComponent,
    ProductListComponent
  ],
  providers: [ProductService],
  //bootstrap: [AppComponent]
})
export class AppModule { }