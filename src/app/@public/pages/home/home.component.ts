import { Component, OnInit } from '@angular/core';
import { ICarouselItem } from 'projects/shop-ui/src/lib/interfaces/carousel-item.interface';
import { CURRENCIES_SYMBOL } from 'projects/shop-ui/src/lib/constants/currencies.enum';
import { ProductsService } from '@core/services/products.service';
import { ACTIVE_FILTERS } from '@core/constants/filter';
import { UsersService } from '@core/services/users.service';
import { IProduct } from 'projects/shop-ui/src/lib/interfaces/product.interface';
import { closeAlert, loadDate } from '@shared/alerts/alerts';
// import carouselItems from '@data/carousel.json'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cartCountElements = 0;
  cartItems = [];
  selectCurrency = CURRENCIES_SYMBOL.USD;
  items: ICarouselItem[] = [];
  productsList: IProduct[] = [];
  listOne;
  listTwo;
  listthree;
  listfour;
  listfive;
  loading: boolean;

  constructor(private products: ProductsService) { }

  ngOnInit(): void {
    this.loading = true;
    loadDate('Cargando datos...', 'Cargando datos...');
    this.products.getHomePage().subscribe((data) => {
      console.log(data);
      this.listOne = data.tenisdemujer;
      this.listTwo = data.tenisdehombre;
      this.listthree = data.tenisdenino;
      this.listfour = data.tenisdenina;
      this.listfive = data.topPrice;
      this.items = this.manageCarousel(data.carousel);
      closeAlert();
      this.loading = false;
    });
  }
  private manageCarousel(list) {
    const itemsValue: Array<ICarouselItem> = [];
    list.shopProducts.map((item) => {
      itemsValue.push({
        id: item.id,
        title: item.product.name,
        description: item.platform.name,
        background: item.product.img,
        url: '/tienda/details'.concat(item.id),
      });
    });
    return itemsValue;
  }
}
