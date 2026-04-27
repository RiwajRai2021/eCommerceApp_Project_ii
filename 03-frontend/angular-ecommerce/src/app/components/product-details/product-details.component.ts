import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../common/product';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Location } from '@angular/common';
import { CartService } from '../../services/cart.services';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {

  product: Product | undefined;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private location: Location
  ) {}

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    // ✅ paramMap.subscribe handles both initial load AND navigation changes
    this.route.paramMap.subscribe(params => {
      const theProductId: number = +params.get('id')!;
      if (theProductId) {
        this.handleProductDetails(theProductId);
      }
    });
  }

  handleProductDetails(theProductId: number) {
    this.productService.getProduct(theProductId).subscribe(data => {
      console.log('PRODUCT DATA:', data);
      this.product = data;
      this.cdr.detectChanges();
    });
  }

  addToCart(){
  console.log('addToCart() called');        // ✅ is this logging?
  console.log('product:', this.product);    // ✅ is product defined?
  
  if(!this.product){
    console.log('product is undefined!'); 
    return; 
  }

  console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`); 
  const theCartItem = new CartItem(this.product); 
  this.cartService.addToCart(theCartItem); 
}
}