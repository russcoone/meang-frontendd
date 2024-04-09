import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiendaRoutingModule } from './tienda-routing.module';
import { TiendaComponent } from './tienda.component';
import { ProductCategoryListModule } from '@core/components/product-category-list/product-category-list.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [TiendaComponent],
  imports: [
    CommonModule,
    TiendaRoutingModule,
    ProductCategoryListModule,
    NgbPaginationModule,
    FormsModule
  ]
})
export class TiendaModule { }
