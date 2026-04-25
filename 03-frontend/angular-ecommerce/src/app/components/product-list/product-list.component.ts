import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, NgbModule],
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 0;  // ← fixed
  searchMode: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
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

  if (this.previousCategoryId != this.currentCategoryId) {
    this.thePageNumber = 1;
  }

  this.previousCategoryId = this.currentCategoryId;

  this.productService.getProductListPaginate(
  this.thePageNumber - 1,
  this.thePageSize,
  this.currentCategoryId
).subscribe(data => {
  this.products = data._embedded.products;
  this.thePageNumber = data.page.number + 1;
  this.thePageSize = data.page.size;
  this.theTotalElements = data.page.totalElements;
});
}
  updatePageNumber(pageNumber: number) {
    this.thePageNumber = pageNumber;
    this.handleListProducts(String(this.currentCategoryId));
  }

}