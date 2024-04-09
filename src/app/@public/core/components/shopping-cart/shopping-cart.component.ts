import { Component, OnInit } from '@angular/core';
import { CartService } from '@shop-core/services/cart.service.ts.service';
import { ICart } from './shoppin.cart.interface';
import { IProduct } from 'projects/shop-ui/src/lib/interfaces';
import { CURRENCY_SELECT } from '@core/constants/config';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart: ICart
  currencySelect = CURRENCY_SELECT
  constructor(private cartService: CartService) {
    this.cartService.itemsVar$.subscribe((data: ICart) => {
      if (data !== undefined && data !== null) {
        this.cart = data
      }
    })
  }

  ngOnInit(): void {
    this.cart = this.cartService.initialize()
    console.log('carrito', this.cart)
  }
  clear() {
    this.cartService.clear();
  }
  clearItem(product: IProduct) {
    this.manageProductUnitInfo(0, product)
  }

  changeValue(qty: number, product: IProduct) {
    this.manageProductUnitInfo(qty, product)
  }

  manageProductUnitInfo(qty: number, product: IProduct) {
    product.qty = qty;
    this.cartService.manageProduct(product);

  }

  proccess() {
    console.log(this.cart)

  }



  closeNav() {

    console.log('Close nav')
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("overlay").style.display = "none";
    document.getElementById("app").style.overflow = "auto";
  }

}
