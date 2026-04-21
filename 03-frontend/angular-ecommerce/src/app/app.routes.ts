import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes = [
  { path: 'category/:id', component: ProductListComponent },   // ✅ REQUIRED
  { path: 'category', component: ProductListComponent },        // optional
  { path: '', redirectTo: '/category/1', pathMatch: 'full' },  // optional
];
