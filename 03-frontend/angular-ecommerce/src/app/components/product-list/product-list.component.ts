import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false; 

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,     // 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
  this.route.paramMap.subscribe(params => {
    this.listProducts(params);
  });
}

listProducts(params: any) {
  this.searchMode = params.has('keyword');

  if (this.searchMode) {
    this.handleSearchProducts(params.get('keyword')!);
  } else {
    this.handleListProducts(params.get('id'));
  }
}

handleSearchProducts(theKeyword: string) {
  this.productService.searchProducts(theKeyword).subscribe(data => {
    this.products = data;
  });
}

handleListProducts(id: string | null) {
  this.currentCategoryId = id ? +id : 1;

  console.log("Current Category ID:", this.currentCategoryId);

  this.productService.getProductListByCategory(this.currentCategoryId)
    .subscribe(data => {
      console.log("DATA RECEIVED FROM BACKEND:", data);
      this.products = data;
      this.cdr.detectChanges();
    });
  }
}

