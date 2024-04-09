import { HttpClientModule } from '@angular/common/http';
import { GraphqlModule } from './@graphql/modules/graphql.module';
import { PublicModule } from './@public/pages/public.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './@admin/pages/admin.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AdminModule,
    PublicModule,
    AppRoutingModule,
    GraphqlModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
