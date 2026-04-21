import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,     // ✅ FIXED
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // 🔥 React to category changes
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    // 🔥 Read category ID from URL
    const hasCategoryId = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }

    console.log("Current Category ID:", this.currentCategoryId);

    // 🔥 Load products for this category
    this.productService.getProductListByCategory(this.currentCategoryId)
      .subscribe(data => {
        console.log("DATA RECEIVED FROM BACKEND:", data);
        this.products = data;
        this.cdr.detectChanges();
      });
  }
}
