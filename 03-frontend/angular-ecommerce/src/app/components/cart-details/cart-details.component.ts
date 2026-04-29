import { Component } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';
import { CommonModule, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [NgForOf, CurrencyPipe, NgIf, CommonModule, RouterLink],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css',
})
export class CartDetails {

  cartItems:CartItem[] = []; 
  totalPrice: number = 0; 
  totalQuantity:number = 0; 

  constructor(private cartService: CartService) { }

  ngOnInit():void{
    this.listCardDetails(); 
  }
  listCardDetails() {
    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems; 

    //subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data 
    );

    //compute cart total price and quantity 
    this.cartService.totalQuantity.subscribe(
      data =>this.totalQuantity = data
    ); 

    this.cartService.computeCartTotals(); 


  }

  incrementQuantity(theCartItem:CartItem){
    this.cartService.addToCart(theCartItem); 
  }

  decrementQuantity(theCartItem: CartItem){
    this.cartService.decrementQuantity(theCartItem); 
  }
 

}
