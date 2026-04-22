import { Component, signal } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { ProductCategoryMenuComponent } from "./components/product-category-menu/product-category-menu.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { SearchComponent} from "./components/search/search.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent, 
            CommonModule,
            ProductCategoryMenuComponent, 
            SearchComponent, 
            RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('angular-ecommerce');
}
