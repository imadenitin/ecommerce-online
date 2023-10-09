import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { ProductdetailsRoutingModule } from './productdetails-routing.module';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutUsComponent } from './about-us/about-us.component'

@NgModule({
  declarations: [
    CartComponent,
    ProductsComponent,
    SignUpComponent,
    LogInComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProductdetailsRoutingModule
  ]
})
export class ProductdetailsModule { }
