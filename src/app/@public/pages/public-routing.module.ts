import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'tienda/details/:id',
        loadChildren: () =>
          import('./tienda/details/details.module').then(
            (m) => m.DetailsModule
          ),
      },
      {
        path: 'tienda/:type/:filter',
        loadChildren: () =>
          import('./tienda/tienda.module').then(
            (m) => m.TiendaModule
          ),
      },
      {
        path: 'checkout',
        loadChildren: () =>
          import('./forms/checkout/checkout.module').then(
            (m) => m.CheckoutModule
          ),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./contact/contact.module').then((m) => m.ContactModule),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./forms/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./forms/register/register.module').then(
            (m) => m.RegisterModule
          ),
      },
      {
        path: 'active/:token',
        loadChildren: () =>
          import('./forms/active/active.module').then((m) => m.ActiveModule),
      },
      {
        path: 'forgot',
        loadChildren: () =>
          import('./forms/forgot/forgot.module').then((m) => m.ForgotModule),
      },
      {
        path: 'reset/:token',
        loadChildren: () =>
          import('./forms/change-password/change-password.module').then(
            (m) => m.ChangePasswordModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule { }
