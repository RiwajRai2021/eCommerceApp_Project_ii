import { Component, signal } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';

import { ProductCategoryMenuComponent } from "./components/product-category-menu/product-category-menu.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { SearchComponent} from "./components/search/search.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent, ProductCategoryMenuComponent, SearchComponent, RouterOutlet, NgbModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('angular-ecommerce');
}
