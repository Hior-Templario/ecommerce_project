import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa el CommonModule, necesario para usar directivas comunes como ngIf o ngFor.


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'] 
})
export class ProductDetailsComponent implements OnInit{
  
  product!: Product;

  constructor( private productService: ProductService,
               private router: ActivatedRoute){}

  ngOnInit(): void {
    this.router.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
    
  }
  handleProductDetails() {
    
    const theProductId: number = +this.router.snapshot.paramMap.get('id')!;

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product=data;
      }
    )
  
  }
 

}
