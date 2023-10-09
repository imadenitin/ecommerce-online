import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
import { AuthserviceService } from 'src/app/servicec/authservice.service';
import { CartService } from 'src/app/servicec/cart.service';
import { UserService } from 'src/app/servicec/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  userData: any;
  userCart: any[] = [];
  length: any;

  totalPrice: number = 0;

  constructor(private userService: UserService) { }


  getUserCart() {
    const userId = localStorage.getItem('userId');
    const url = `http://localhost:3000/users`;
    this.userService.getUsersDetailsById(url, userId).subscribe(res => {
      this.userData = res;
      this.userCart = this.userData['cart'].map(item => ({ ...item, quantity: 1 }));
      this.calculateTotalPrice(); // Calculate total price when fetching the cart
      this.length = this.userCart.length;
    });
  }

  // Calculate total price based on item prices and quantities
  calculateTotalPrice() {
    this.totalPrice = this.userCart.reduce((total, item) => {
      return total + (item.amount * item.quantity);
    }, 0);
  }

  remove(itemId: string) {
    const userId = localStorage.getItem('userId');

    this.userService.removeFromCart(userId, itemId).subscribe(
      (response) => {
        alert("Removed successfully");
        console.log('Item removed from cart, and user updated:', response.data);
        this.getUserCart();
      },
      (error) => {
        console.error('Error removing item from cart:', error);
      }
    );
  }

  minus(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  plus(item: any) {
    item.quantity++;
  }

  ngOnInit(): void {
    this.getUserCart();
  }

}
