import { Component, OnInit } from '@angular/core'; // ✅ import OnInit
import { CartService } from '../../services/cart.services';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-status',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css',
})
export class CartStatusComponent implements OnInit { // ✅ implement OnInit

  totalPrice: number = 0.00; 
  totalQuantity: number = 0; 

  constructor(private cartService: CartService){}

  ngOnInit(): void { // ✅ renamed from UpdateCartStatus()
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    ); 

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data 
    );
  }
}