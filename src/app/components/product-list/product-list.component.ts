import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';





@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  //imports: [],
  //templateUrl: './product-list.component.html',
  //templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit{

  products: Product[] = [];
tempProduct: any;

 constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.listProducts();

  }

  listProducts() {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;

        
      }
    )
  }
}
