import { closeAlert, loadDate } from './../../../../@shared/alerts/alerts';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@core/services/products.service';
import { IProduct } from 'projects/shop-ui/src/lib/interfaces';
import { CURRENCY_SELECT } from '@core/constants/config';
import { CartService } from '@shop-core/services/cart.service.ts.service';
import { ICart } from '@shop-core/components/shopping-cart/shoppin.cart.interface';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  product: IProduct


  // products[Math.floor(Math.random() * products.length)];
  selectImage: string;
  currencySelect = CURRENCY_SELECT;
  randomItems: Array<IProduct> = [];
  screens = [];
  relationalProducts: Array<object> = [];
  activateRoute: any;
  loading: boolean;


  constructor(private productService: ProductsService, private activatedRoute: ActivatedRoute, private cartService: CartService) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      console.log('parametro detalles', +params.id)
      loadDate('Cargando datos...', 'Cargando datos...');
      this.loading = true;
      this.loadDateValue(+params.id);
      this.updateListener(+params.id);
    });
    this.cartService.itemsVar$.subscribe((data: ICart) => {
      if (data.subtotal === 0) {
        this.product.qty = 1;
        return;
      }
      this.product.qty = this.findProduct(+this.product.id).qty;

    });
  }

  updateListener(id: number) {
    console.log('escuchando', id);
    this.productService.stockUpdateListener(id).subscribe(
      (result) => {
        console.log('Actualizacion', result);
        this.product.stock = result.stock

        //comprivar que el stock es igual o mayor que la cantidad seleccionada

        if (this.product.qty > this.product.stock) {
          this.product.qty = this.product.stock;
        }
        if (this.product.stock === 0) {
          this.product.qty = 1;
        }

      }
    );
  }

  findProduct(id: number) {
    return this.cartService.cart.products.find(item => +item.id === id)
  }

  loadDateValue(id: number) {
    this.productService.getItem(id).subscribe(result => {
      console.log(result);
      this.product = result.product;
      const saveProductInCart = this.findProduct(+this.product.id);
      this.product.qty = (saveProductInCart !== undefined) ? saveProductInCart.qty : this.product.qty;
      this.selectImage = this.product.img;
      this.screens = result.screens;
      this.relationalProducts = result.relational;
      this.randomItems = result.random;
      this.loading = false;
      closeAlert();

    });
  }

  changeValue(qty: number) {

    this.product.qty = qty;
  }

  selectOtherPlatform($event) {
    console.log($event.target.value)
    const id = +$event.target.value;
    this.loadDateValue(id);
    this.updateListener(id);
    window.history.replaceState({}, '', `/#/games/details/${id}`);

  }

  selectImgMain(i) {
    this.selectImage = this.screens[i];
  }

  addToCart() {
    this.cartService.manageProduct(this.product);
  }

}
