import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/servicec/authservice.service';
import { CartService } from 'src/app/servicec/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private cartsrvc: CartService, private authService: AuthserviceService,private router:Router) { }
  log: boolean;
  checkAuthentication() {
    if (this.authService.isAuthenticated()) {
      this.log = true; // Set to true when authenticated
    } else {
      this.log = false; // Set to false when not authenticated
    }
  }

  logout() {
    this.authService.logout();
    this.log = false;
    this.router.navigate(['/shopping/logIn']);
  }


  ngOnInit(): void {
    this.checkAuthentication(); 
  }

}
