import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-category-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive],
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']  
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[] = [];


  constructor(private productService: ProductService) {}

  ngOnInit(){
    this.listProductCategories();
  }

  listProductCategories() {

    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      },
      
    );
  }
}

  


