import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],

})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(
  private productService: ProductService,
  private cdr: ChangeDetectorRef
) {
  console.log("🔥 PRODUCT LIST COMPONENT CONSTRUCTOR FIRED");
  console.log("INSTANCE ID:", Math.random());
}



  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
  this.productService.getProductList().subscribe(data => {
    console.log("DATA RECEIVED FROM BACKEND:", data);

    this.products = data;

    console.log("ASSIGNED TO this.products:", this.products);
    console.log("LENGTH AFTER ASSIGN:", this.products.length);

    this.cdr.detectChanges();   // ⭐ FORCE TEMPLATE UPDATE
  });
}


}