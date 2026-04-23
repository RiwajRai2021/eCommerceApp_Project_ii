import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-category-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush   // ✅ FIX
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[] = [];

  constructor(
    private productService: ProductService,
    private cd: ChangeDetectorRef                 // ✅ FIX
  ) {}

  ngOnInit() {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      (data: ProductCategory[]) => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
        this.cd.markForCheck();                  // ✅ FIX
      }
    );
  }
}
