import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../common/product';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Location } from '@angular/common';

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
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private location:Location
  ) {}

  goBack() {
  this.location.back();  // 👈 add this method
}

  ngOnInit(): void {
    // Handle initial load (direct URL / refresh)
    const initialId = +this.route.snapshot.paramMap.get('id')!;
    if (initialId) {
      this.handleProductDetails(initialId);
    }

    // Handle navigation between products
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
}