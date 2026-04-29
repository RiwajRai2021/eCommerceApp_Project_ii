import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetails } from './components/cart-details/cart-details.component';
import { Checkout } from './components/checkout/checkout.component';



export const routes: Routes = [
  {path:'checkout', component: Checkout}, 
  { path: 'cart-details',component: CartDetails}, 
  { path: 'products/:id',component: ProductDetailsComponent},
  { path: 'search/:keyword', component: ProductListComponent},
  { path: 'category/:id', component: ProductListComponent },   
  { path: 'category', component: ProductListComponent },        
  { path: '', redirectTo: '/category/1', pathMatch: 'full' },  
  { path: '**', redirectTo: '/category/1', pathMatch: 'full' }, 
 


];

