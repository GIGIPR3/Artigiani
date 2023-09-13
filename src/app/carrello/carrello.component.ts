import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { LoggedUserService } from '../service/logged-user.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css'],
})
export class CarrelloComponent implements OnInit {
  cartItems: any[] | null = [];

  constructor(
    private loggedUserService: LoggedUserService,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  cart: string[] = [];
  productInCart: any[] = [];

  ngOnInit(): void {
    const cartJson = this.cartService.getCart();

    if (cartJson) {
      this.cart = JSON.parse(cartJson);
      console.log('User data:', this.cart);
    } else {
      console.log('User data not found in cookies');
    }
    this.cart.forEach((cartItem) =>
      this.productService
        .getProductbyId(cartItem)
        .subscribe((response) => this.productInCart.push(response))
    );
    console.log(this.productInCart);
  }
}
