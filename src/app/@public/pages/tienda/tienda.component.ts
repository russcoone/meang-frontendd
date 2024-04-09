import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ACTIVE_FILTERS } from '@core/constants/filter';
import { IInfoPage } from '@core/interfaces/result-data.interface';
import { ProductsService } from '@core/services/products.service';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { ITiendaPageInfo } from './tienda-info.interface';
import { GAMES_PAGES_INFO, TYPE_OPERATION } from './game.constants';
import { closeAlert, loadDate } from '@shared/alerts/alerts';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
})
export class TiendaComponent implements OnInit {
  slectPage: any
  infoPage: IInfoPage = {
    page: 1,
    pages: 1,
    itemsPage: 5,
    total: 5,
  };
  typeData: TYPE_OPERATION;
  tiendaPageInfo: ITiendaPageInfo;
  productsList: Array<IProduct> = [];
  loading: boolean;

  constructor(
    private products: ProductsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.loading = true;
      loadDate('Cargando datos...', 'Cargando datos...');
      console.log(params);
      this.tiendaPageInfo = GAMES_PAGES_INFO[`${params.type}/${params.filter}`];
      this.typeData = params.type;
      this.slectPage = 1;
      this.loadData();
    });
  }

  loadData() {
    if (this.typeData === TYPE_OPERATION.PLATFORMS) {
      this.products
        .getByPlatform(
          this.slectPage,
          this.infoPage.itemsPage,
          ACTIVE_FILTERS.ACTIVE,
          false,
          this.tiendaPageInfo.platformsIds,
          true,
          true
        )
        .subscribe((data) => {
          this.asignResult(data);
        });
      return;
    }
    this.products
      .getByLastUnitsOffers(
        this.slectPage,
        this.infoPage.itemsPage,
        ACTIVE_FILTERS.ACTIVE,
        false,
        this.tiendaPageInfo.topPrice,
        this.tiendaPageInfo.stock,
        true,
        true
      )
      .subscribe((data) => {
        this.asignResult(data);
      });
  }
  private asignResult(data) {
    this.productsList = data.result;
    this.infoPage = data.info;
    closeAlert();
    this.loading = false;
  }
}
