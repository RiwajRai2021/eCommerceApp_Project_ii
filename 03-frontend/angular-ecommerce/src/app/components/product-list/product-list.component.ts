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
    // 🔥 React to category changes
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword'); 

    if(this.searchMode){
      this.handleSearchProducts(); 

    }
    else{
       this.handleListProducts(); 
    }

    
  }

  handleSearchProducts(){

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!; 

    // now search for the producs using keyword 
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data; 
      }

    )

  }

  handleListProducts(){

    // check if "id" parameter is avaialble
    const hasCategoryId = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get the "id" param string, convert string to a number using 
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

    } else {
      //not category id avaiable...default to category id 1 
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
