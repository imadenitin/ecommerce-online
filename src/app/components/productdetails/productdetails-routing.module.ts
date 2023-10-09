import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AboutUsComponent } from './about-us/about-us.component';


const routes: Routes = [
  {path:'',component:ProductsComponent},
  {path:'mens',component:ProductsComponent},
  {path:'cart',component:CartComponent, canActivate:[AuthGuard]},
  {path:'logIn',component:LogInComponent},
  {path:'signUp',component:SignUpComponent},
  {path:'aboutUs',component:AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductdetailsRoutingModule { }
