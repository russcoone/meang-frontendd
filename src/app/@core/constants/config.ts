import { CURRENCIES_SYMBOL } from "@mugan86/ng-shop-ui";
import { CURRENCY_LIST } from "projects/shop-ui/src/public-api";

export const CURRENCY_SELECT = CURRENCIES_SYMBOL[CURRENCY_LIST.MEXICAN_PESO];
export const CURRENCY_CODE = CURRENCY_LIST.MEXICAN_PESO;

//rutas para direccionar despues del login

export const REDIRECTS_ROUTES = [
    '/checkout'
];