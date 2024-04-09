import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route,
  Router,
} from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import jwtDecode from 'jwt-decode';
const jwtDecode = require('jwt-decode');

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Primer comprvar que existe sesion
    if (this.auth.getSession() !== null) {
      console.log('Estamos logueados');
      const dataDecode = this.decodeToken();
      console.log(dataDecode);
      // comprovar que no esta caducado el token
      if (dataDecode.exp < new Date().getTime() / 1000) {
        console.log('!Session Caducada');
        return this.redirect();
      }
      if (dataDecode.user.role === 'ADMIN') {
        console.log('Somos administradores');
        return true;
      }
      console.log('No somos administradores');
    }
    console.log('Session no iniciada');
    return this.redirect();
  }
  redirect() {
    this.router.navigate(['/login']);
    return false;
  }
  decodeToken() {
    return jwtDecode(this.auth.getSession().token);
  }
}
