import { IMeData } from './../../../../@core/interfaces/session.interface';
import { AuthService } from '@core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import shopMenuItems from '@data/menus/shop.json';
import { IMenuItem } from '@core/interfaces/menu-item.interface';
import { CartService } from '@shop-core/services/cart.service.ts.service';
import { REDIRECTS_ROUTES } from '@core/constants/config';
import { Router } from '@angular/router';
import { ICart } from '../shopping-cart/shoppin.cart.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  cartItemsTotal: number;
  menuItems: Array<IMenuItem> = shopMenuItems
  session: IMeData = {
    status: false,
  };
  access = false;
  role: string;
  userLabel = '';
  constructor(private authService: AuthService, private cartService: CartService, private router: Router) {
    this.authService.accessVar$.subscribe((result) => {
      console.log(result.status);
      this.session = result;
      this.access = this.session.status;
      this.role = this.session.user?.role;
      this.userLabel = `${this.session.user?.name} ${this.session.user?.lastname}`;
    });
    this.cartService.itemsVar$.subscribe((data: ICart) => {
      if (data !== undefined && data !== null) {
        this.cartItemsTotal = data.subtotal;

      }

    });
  }

  ngOnInit(): void {
    this.cartItemsTotal = this.cartService.initialize().subtotal;
  }
  open() {
    console.log('open navar')
    this.cartService.open()
  }

  logout() {
    //rutas que usaremos para direccionar
    if (REDIRECTS_ROUTES.includes(this.router.url)) {
      // en elcazo de encontrarla marcamos para que  direcciones
      localStorage.setItem('route_after_login', this.router.url);


    }


    this.authService.resetSession();
  }
}
