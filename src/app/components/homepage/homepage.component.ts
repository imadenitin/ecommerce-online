import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/servicec/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private productService: ProductService) { }
  productList: any[];
  selectedProduct: any; // To store the selected product
  getProduct() {
    let url = 'http://localhost:3000/products';
    this.productService.getProduct(url).subscribe(res => {
      this.productList = res;
      console.log(this.productList);
    })
  }

  getProductById(id: number) {
    let url = 'http://localhost:3000/products';
    this.productService.getProductById(url, id).subscribe(
      (product) => {
        this.selectedProduct = product;
        console.log('Selected Product:', this.selectedProduct);
      },
      (error) => {
        console.error('Error fetching product by ID:', error);
      }
    );
  }

  WarningToast(){
    
  }
  
  ngOnInit(): void {
    this.getProduct()
  }

}
