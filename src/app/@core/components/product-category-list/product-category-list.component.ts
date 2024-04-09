import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@shop-core/services/cart.service.ts.service';
import { IProduct } from 'projects/shop-ui/src/lib/interfaces/product.interface';
import { CURRENCIES_SYMBOL } from 'projects/shop-ui/src/public-api';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent {
  @Input() title = 'Titulo de la categoria';
  @Input() productsList: Array<IProduct> = [];
  @Input() description = '';
  @Input() showDesc: boolean;
  @Input() selectCurrency = CURRENCIES_SYMBOL.USD;

  constructor(private router: Router, private cartService: CartService) { }

  addToCart($event: IProduct) {
    console.log('Add to cart', $event);
    this.cartService.manageProduct($event)
  }
  showProductDetails($event: IProduct) {
    console.log('Show product details', $event);
    this.router.navigate(['/tienda/details', +$event.id])
  }


}
