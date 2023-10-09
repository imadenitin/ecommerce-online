import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, mergeMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsersDetails(url): Observable<any> {
    return this.http.get(url);
  }

  getUsersDetailsById(url, id): Observable<any> {
    return this.http.get(url + '/' + id);
  }

  addToUserCart(url: string, userData: any): Observable<any> {
    return this.http.put(url, userData);
  }

  removeFromCart(userId: string, itemId: string): Observable<any> {
    let baseUrl = 'http://localhost:3000';
    const url = `${baseUrl}/users/${userId}`; // Construct the URL correctly
    return this.http.get<any>(url)
      .pipe(
        mergeMap((userResponse) => {
          const user = userResponse; // Remove .data as it's not needed
          const itemIndex = user.cart.findIndex((cartItem) => cartItem.id === itemId);
          if (itemIndex !== -1) {
            const deletedCartItem = user.cart.splice(itemIndex, 1)[0];
            const totalAmountAfterDeletion = user.totalAmount - deletedCartItem.totalamount;
            user.totalAmount = Math.max(totalAmountAfterDeletion, 0);
            return this.http.put<any>(url, user); // Use the same URL
          } else {
            return throwError('Item not found in the cart');
          }
        }),
      );
  }

  userSignUp(url, req): Observable<any> {
    return this.http.post(url, req);
  }
}
