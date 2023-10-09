import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/servicec/authservice.service';
import { ProductService } from 'src/app/servicec/product.service';
import { UserService } from 'src/app/servicec/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  userData: any;

  constructor(private srvc: ProductService, private userService: UserService, private authService: AuthserviceService, private router: Router) { }

  data: any;
  getProducts() {
    let url: any = 'http://localhost:3000/products'
    this.srvc.getProduct(url).subscribe(res => {
      this.data = res
    })
  }

  getUserById(){
    const userId = localStorage.getItem('userId');
    const url = `http://localhost:3000/users`;
    this.userService.getUsersDetailsById(url,userId).subscribe(res=>{
      console.log(res);
      this.userData=res;
    })
  }
  
  addToCart(product: any) {
    if (this.authService.isAuthenticated()) {
      const userId = localStorage.getItem('userId');
      const url = `http://localhost:3000/users/${userId}`;
      // Update the user's cart locally
      this.userData.cart.push(product);
      // Send a PUT request to update the user's information, including the cart
      this.userService.addToUserCart(url, this.userData).subscribe(
        (res) => {
          alert("Added Cart ");
          console.log('Product added to cart:', res);
        },
        (error) => {
          console.error('Error adding product to cart:', error);
        }
      );
    } else {
      this.router.navigate(['/shopping/logIn']);
    }
  }
  

  ngOnInit(): void {
    this.getProducts()
    this. getUserById();
  }

}
