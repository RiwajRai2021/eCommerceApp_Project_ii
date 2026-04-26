import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';



export const routes: Routes = [
  { path: 'products/:id',component: ProductDetailsComponent},
  { path: 'search/:keyword', component: ProductListComponent},
  { path: 'category/:id', component: ProductListComponent },   // ✅ REQUIRED
  { path: 'category', component: ProductListComponent },        // optional
  { path: '', redirectTo: '/category/1', pathMatch: 'full' },  
  { path: '**', redirectTo: '/category/1', pathMatch: 'full' } 


];

