import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/servicec/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private route: Router, private srvc: UserService) { }

  submit() {
    let url = 'http://localhost:3000/users';
    const req = {
      fullname: this.signUpForm.controls['fullname'].value,
      email: this.signUpForm.controls['email'].value,
      password: this.signUpForm.controls['password'].value,
      contact: this.signUpForm.controls['contact'].value,
      checkbox: this.signUpForm.controls['checkbox'].value,
      cart: []
    }
    this.srvc.userSignUp(url, req).subscribe(res => {
      console.log(res);
      alert("SignUp Successfully");
      this.route.navigate(['/shopping/logIn']);
    })
  }
  resetForm() {
    this.signUpForm.reset();
  }


  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      checkbox: ['', [Validators.required]]
    })
  }

}
