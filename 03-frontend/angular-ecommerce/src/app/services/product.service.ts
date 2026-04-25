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

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductListPaginate(thePage: number, 
                        thePageSize: number, 
                        theCategoryId: number): Observable<GetResponseProducts> {
                          
                          //need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                + `&page=${thePage}&size=${thePageSize}`;


    return this.httpClient.get<GetResponseProducts>(searchUrl); 
  }

  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => this.extractId(response._embedded.products))
    );
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => this.extractId(response._embedded.products))
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseCategories>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProductListByCategory(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => this.extractId(response._embedded.products))
    );
  }

  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  private extractId(products: any[]): Product[] {
    return products.map(p => {
      p.id = +p._links.self.href.split('/').pop()!;
      return p as Product;
    });
  }

}

interface GetResponseProducts {
  _embedded: {
    products: any[];
  }, 

  page:{
    size: number,
    totalElements: number,
    totalPages: number, 
    number: number
  }
}

interface GetResponseCategories {
  _embedded: {
    productCategory: ProductCategory[];
  }
}