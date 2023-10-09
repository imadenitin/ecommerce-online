import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/servicec/user.service';
import { sign } from 'jsonwebtoken'; // Import the sign function
import { AuthserviceService } from 'src/app/servicec/authservice.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private srvc: UserService, private fb: FormBuilder, private route: Router, private authService: AuthserviceService) { }

  logInForm: FormGroup;

  // stored Details all users
  usersDetails: any[] = [];

  // Get All Users Data
  getUserData() {
    let url = 'http://localhost:3000/users';
    this.srvc.getUsersDetails(url).subscribe((res: any[]) => {
      this.usersDetails = res;
    });
  }

  formUsername: string = '';
  formPassword: string = '';

  // isAuthenticated then cant go logIn Page
  navigateHomePage() {
    if (this.authService.isAuthenticated()) {
      this.route.navigate(['/home']);
    } else {
      this.route.navigate(['/shopping/logIn'])
    }
  }

  // logInUser
  login() {
    this.formUsername = this.logInForm.controls['username'].value;
    this.formPassword = this.logInForm.controls['password'].value;
    // here check input  username and password matched or not. 
    const user = this.usersDetails.find(u => u.email === this.formUsername && u.password === this.formPassword);
    //
    if (user) {
      const userToken = 'lfdgernmcewt' + this.formUsername + 'wsdsgyjnhiolkiovxfbgddcfdgjqaxjihfxgyr';
      localStorage.setItem('userToken', this.formUsername);
      const userId = user.id;

      // Store the user's ID in local storage
      localStorage.setItem('userId', userId.toString());

      // Log in successfully
      this.authService.login(userToken);
      console.log(this.logInForm.value);
      alert("LogIn successfully");
      this.route.navigate(['/shopping/mens']);
    } else {
      // Invalid credentials
      alert("Invalid credential");
    }
  }

  ngOnInit(): void {
    this.logInForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.getUserData();
    this.navigateHomePage()
  }

}
