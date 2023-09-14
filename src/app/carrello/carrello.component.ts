import { Component, OnInit } from '@angular/core';
import { Order } from '../interfaces/order';
import { User } from '../interfaces/user';
import { CartService } from '../service/cart.service';
import { LoggedUserService } from '../service/logged-user.service';
import { OrdersService } from '../service/orders.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css'],
})
export class CarrelloComponent implements OnInit {
  cartItems: any[] | null = [];

  user: User | null = this.loggedUserService.user;
  order: Order = {
    productIds: [],
    userId: '',
  };

  constructor(
    private loggedUserService: LoggedUserService,
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrdersService
  ) {}

  cart: string[] = [];
  productInCart: any[] = [];

  ngOnInit(): void {
    const userJson = this.loggedUserService.getUser();
    console.log(userJson);

    if (userJson) {
      this.user = JSON.parse(userJson);
    } else {
      console.log('User data not found in cookies');
    }

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

  createOrder() {
    console.log(this.cart);
    this.order!.productIds = this.cart;
    this.order!.userId = this.user!.userId;
    console.log(this.order);
    this.orderService.postOrder(this.order).subscribe();
  }
}
