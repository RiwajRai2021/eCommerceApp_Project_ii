import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  [x: string]: any;

  // private baseUrl = 'http://localhost:8080/api/products?size=100';

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseCategories>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
  
  getProductListByCategory(categoryId: number) {
  // const searchUrl = `${this.baseUrl}/products/search/findByCategoryId?id=${categoryId}`;

  const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;



  return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
    map(response => response._embedded.products)
  );
}

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseCategories {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
