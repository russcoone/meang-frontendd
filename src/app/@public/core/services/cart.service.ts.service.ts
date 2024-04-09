import { Injectable } from '@angular/core';
import { ICart } from '@shop-core/components/shopping-cart/shoppin.cart.interface';
import { IProduct } from 'projects/shop-ui/src/lib/interfaces';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: Array<IProduct> = []
  cart: ICart = {
    total: 0,
    subtotal: 0,
    products: this.products,

  }


  constructor() { }


  public itemsVar = new Subject<ICart>()
  public itemsVar$ = this.itemsVar.asObservable()




  // Inicializando el carrito
  initialize() {
    const storeData = JSON.parse(localStorage.getItem('cart'));
    if (storeData !== null) {
      this.cart = storeData

    }
    return this.cart

  }

  public updateItemsInCart(newValue: ICart) {
    this.itemsVar.next(newValue)
  }

  manageProduct(product: IProduct) {
    //obtener cantidad de producto en el carrito
    const productTotal = this.cart.products.length;
    //comprobamos si tiene productos
    if (productTotal === 0) {
      console.log('añadiendo el primer carrito')
      this.cart.products.push(product);
    } else { // si temos producto hacer la siguiente
      let actionUpdateOK = false;
      for (let i = 0; i < productTotal; i++) {
        //comprobar que coincide el product con alguno de la lista
        if (product.id === this.cart.products[i].id) {
          console.log('producto exitente')
          if (product.qty === 0) {
            console.log('Borrar item seleccionado');
            this.cart.products.splice(i, 1);
          } else { // actualizar con la nueva informacion
            this.cart.products[i] = product

          }
          actionUpdateOK = true;
          i = productTotal;
        }

      }
      if (!actionUpdateOK) {
        this.cart.products.push(product);

      }

    }
    this.checkoutTotal();
  }


  //Añadir la informacion final antesde hacer el edido

  checkoutTotal() {
    let subtotal = 0;
    let total = 0;
    this.cart.products.map((product: IProduct) => {
      subtotal += product.qty // subtota = subtotal + product.qty
      total += (product.qty * product.price);
    })
    this.cart.total = total;
    this.cart.subtotal = subtotal;
    console.log(this.cart, 'calculado')
    this.setInfo();

  }

  clear() {
    this.products = []
    this.cart = {
      total: 0,
      subtotal: 0,
      products: this.products,
    }
    this.setInfo();
    console.log('Hemos borrado la informacion');
    return this.cart
  }

  private setInfo() {
    localStorage.setItem('cart', JSON.stringify(this.cart))
    this.updateItemsInCart(this.cart);
  }



  open() {
    document.getElementById("mySidenav").style.width = "600px";
    document.getElementById("overlay").style.display = "block";
    document.getElementById("app").style.overflow = "hidden";



  }
  close() {

    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("overlay").style.display = "none";
    document.getElementById("app").style.overflow = "auto";
  }

}
