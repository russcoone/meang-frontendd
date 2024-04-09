import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryListComponent } from './product-category-list.component';
import { ProductItemModule } from 'projects/shop-ui/src/public-api';



@NgModule({
  declarations: [ProductCategoryListComponent],
  imports: [
    CommonModule,
    ProductItemModule
  ],
  exports: [ProductCategoryListComponent]
})
export class ProductCategoryListModule { }
