import { DetailsComponent } from './../../@public/pages/tienda/details/details.component';
import { randomItems } from './../../../../../backend-meang-online-shop/src/lib/db-operations';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { ApiService } from '@graphql/service/api.service';
import { ACTIVE_FILTERS } from '@core/constants/filter';
import {
  SHOP_LAST_UNITS_OFFERS,
  SHOP_PRODUCT_BY_PLATFORM,
  SHOP_PRODUCT_DETAILS,
  SHOP_PRODUCT_RANDOM_ITEMS,
} from '@graphql/operations/query/shop-product';
import { map } from 'rxjs/operators';
import { IProduct } from 'projects/shop-ui/src/lib/interfaces';
import { HOME_PAGE } from '@graphql/operations/query/home-page';
import { DETAILS_PAGE } from '@graphql/operations/query/details-page';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  getHomePage() {
    return this.get(HOME_PAGE, {
      showPlatform: true,
    }).pipe(
      map((result: any) => {
        console.log('Home Page', result);
        return {
          carousel: result.carousel,
          tenisdemujer: this.manageInfo(
            result.tenisdemujer.shopProducts,
            false
          ),
          tenisdehombre: this.manageInfo(
            result.tenisdehombre.shopProducts,
            false
          ),
          tenisdenino: this.manageInfo(result.tenisdenino.shopProducts, true),
          tenisdenina: this.manageInfo(result.tenisdenina.shopProducts, true),
          topPrice: this.manageInfo(result.topPrice1500.shopProducts, true),
        };
      })
    );
  }

  getByPlatform(
    page: number = 1,
    itemsPage: number = 10,
    active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE,
    random: boolean = false,
    platform: Array<string> = ['-1'],
    showInfo: boolean = false,
    showPlatform: boolean = false
  ) {
    return this.get(SHOP_PRODUCT_BY_PLATFORM, {
      page,
      itemsPage,
      active,
      random,
      platform,
      showInfo,
      showPlatform,
    }).pipe(
      map((result: any) => {
        const data = result.shopProductsPlatforms;
        return {
          info: data.info,
          result: this.manageInfo(data.shopProducts),
        };
      })
    );
  }
  getByLastUnitsOffers(
    page: number = 1,
    itemsPage: number = 4,
    active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE,
    random: boolean = false,
    topPrice: number = -1,
    lastUnits: number = -1,
    showInfo: boolean = false,
    showPlatform: boolean = false
  ) {
    return this.get(SHOP_LAST_UNITS_OFFERS, {
      page,
      itemsPage,
      active,
      random,
      topPrice,
      lastUnits,
      showInfo,
      showPlatform,
    }).pipe(
      map((result: any) => {
        const data = result.shopProductsOffersLast;
        return {
          info: data.info,
          result: this.manageInfo(data.shopProducts),
        };
      })
    );
  }

  getItem(id: number) {
    return this.get(
      DETAILS_PAGE, {
      id
    }, {}, false
    ).pipe(map((result: any) => {
      const details = result.details;
      const randomItems = result.randomItems;

      return {
        product: this.setInObject(details.shopProduct, true),
        screens: details.shopProduct.product.screenshoot,
        relational: details.shopProduct.relationalProducts,
        random: this.manageInfo(randomItems.shopProducts, true)
      }

    }))

  }

  getRandomItems() {
    return this.get(
      SHOP_PRODUCT_RANDOM_ITEMS
    ).pipe(map((result: any) => {
      const data = result.randomItems.shopProducts;
      return this.manageInfo(data, true);

    }));
  }






  private setInObject(shopObject, showDescription) {
    return {

      id: shopObject.id,
      img: shopObject.product.img,
      name: shopObject.product.name,
      rating: shopObject.product.rating,
      description:
        shopObject.platform && showDescription
          ? shopObject.platform.name
          : '',
      qty: 1,
      price: shopObject.price,
      stock: shopObject.stock,


    }
  }
  private manageInfo(listProducts: any, showDescription = true) {
    const resultList: Array<IProduct> = [];
    listProducts.map((shopObject) => {
      resultList.push(this.setInObject(shopObject, showDescription));
    });
    return resultList;
  }
}
