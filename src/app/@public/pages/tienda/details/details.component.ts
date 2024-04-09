import { closeAlert, loadDate } from './../../../../@shared/alerts/alerts';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@core/services/products.service';
import { IProduct } from 'projects/shop-ui/src/lib/interfaces';
import { CURRENCY_SELECT } from '@core/constants/config';


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
  randomItems: Array<IProduct> = []
  screens = [];
  relationalProducts: Array<object> = [];
  activateRoute: any;
  loading: boolean;

  constructor(private productService: ProductsService, private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      console.log('parametro detalles', +params.id)
      loadDate('Cargando datos...', 'Cargando datos...');
      this.loading = true;
      this.loadDateValue(+params.id);



    })

  }

  loadDateValue(id: number) {
    this.productService.getItem(id).subscribe(result => {
      console.log(result);
      this.product = result.product;
      this.selectImage = this.product.img;
      this.screens = result.screens;
      this.relationalProducts = result.relational;
      this.randomItems = result.random;
      this.loading = false;
      closeAlert();

    });
  }

  changeValue(qty: number) {
    console.log(qty);
  }

  selectOtherPlatform($event) {
    console.log($event.target.value)
    this.loadDateValue(+$event.target.value)

  }

  selectImgMain(i) {
    this.selectImage = this.screens[i];
  }

}
