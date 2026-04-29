import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

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
    private cartService:CartService, 
    private route: ActivatedRoute,
    private cdr:ChangeDetectorRef 
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
      this.cdr.detectChanges()
    });
  }

  handleListProducts(id: string | null) {
    this.currentCategoryId = id ? +id : 1;

    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`Fetching category: ${this.currentCategoryId}, page: ${this.thePageNumber - 1}`);

    this.productService.getProductListPaginate(
      this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId
    ).subscribe({
      next: data => {
        console.log('Raw API response:', data);
        console.log('Products array:', data._embedded?.products);
        this.products = data._embedded?.products ?? [];
        this.thePageNumber = (data.page?.number ?? 0) + 1;
        this.thePageSize = data.page?.size ?? 10;
        this.theTotalElements = data.page?.totalElements ?? 0;
        this.cdr.detectChanges();
        console.log('this.products after set:', this.products);
      },
      error: err => console.error('API Error:', err)
    });
  }

  updatePageNumber(pageNumber: number) {  // 👈 this was missing
    this.thePageNumber = pageNumber;
    this.handleListProducts(String(this.currentCategoryId));
  }

  addToCart(theProduct: Product){
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`); 

  // TODO .. do the real work
  const theCartItem = new CartItem(theProduct); 

  this.cartService.addToCart(theCartItem); 
  
  }
}