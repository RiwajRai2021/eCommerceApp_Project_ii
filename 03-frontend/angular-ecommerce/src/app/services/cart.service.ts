import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject } from 'rxjs'; // ✅ swap Subject for BehaviorSubject

@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  cartItems: CartItem[] = []; 

  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0); // ✅ initial value 0
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0); // ✅ initial value 0

  constructor(){}

  addToCart(theCartItem: CartItem){

    let alreadyExistsInCart: boolean = false; 
    let existingCartItem: CartItem | undefined = undefined;

    if(this.cartItems.length > 0){
      for(let tempCartItem of this.cartItems){
        if(tempCartItem.id === theCartItem.id){
          existingCartItem = tempCartItem; 
          break; 
        }
      } 
      alreadyExistsInCart = (existingCartItem != undefined); 
    }

    if (alreadyExistsInCart && existingCartItem){
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem); 
    }

    this.computeCartTotals(); 
  }

  computeCartTotals() {
    let totalPriceValue: number = 0; 
    let totalQuantityValue: number = 0; 

    for (let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice; 
      totalQuantityValue += currentCartItem.quantity; 
    }

    this.totalPrice.next(totalPriceValue); 
    this.totalQuantity.next(totalQuantityValue); 

    this.logCartData(totalPriceValue, totalQuantityValue); 
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number){
    console.log('Contents of the cart'); 
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice; 
      console.log(`name: ${tempCartItem.name}, quantity= ${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`); 
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`)
    console.log('----'); 
  }

  decrementQuantity(theCartItem: CartItem) {
  console.log('decrement called, quantity before:', theCartItem.quantity); // 👈 add this
  theCartItem.quantity--;
  console.log('quantity after:', theCartItem.quantity); // 👈 add this

  if(theCartItem.quantity === 0){
    this.remove(theCartItem); 
  } else {
    this.computeCartTotals();
  }
}
remove(theCartItem: CartItem) {
    // get index of item in the array
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id); 
    // if found, remove the item from the array at the given index
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1); 

      this.computeCartTotals(); 
    }
  }
}