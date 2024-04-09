import { Apollo } from 'apollo-angular';
import { ApiService } from './../../@graphql/service/api.service';
import { Injectable } from '@angular/core';
import { LOGIN_QUERY, ME_DATA_QUERY } from '@graphql/operations/query/user';
import { map } from 'rxjs/internal/operators/map';
import { HttpHeaders } from '@angular/common/http';
import { IMeData, ISession } from '@core/interfaces/session.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  accessVar = new Subject<IMeData>();
  accessVar$ = this.accessVar.asObservable();
  constructor(apollo: Apollo) {
    super(apollo);
  }
  updateSeccion(newValue: IMeData) {
    this.accessVar.next(newValue);
  }

  start() {
    if (this.getSession() !== null) {
      this.getMe().subscribe((result: IMeData) => {
        if (!result.status) {
          this.resetSession();
          return;
        }
        this.updateSeccion(result);
      });
      console.log('seesion iniciada');
      return;
    }
    this.updateSeccion({
      status: false,
    });

    console.log('session no iniciada');
  }

  // añadir los metodos para consumir la info de la API

  login(email: String, password: String) {
    return this.get(LOGIN_QUERY, { email, password, include: false }).pipe(
      map((result: any) => {
        return result.login;
      })
    );
  }

  getMe() {
    return this.get(
      ME_DATA_QUERY,
      {
        include: false,
      },
      {
        headers: new HttpHeaders({
          Authorization: (this.getSession() as ISession).token,
        }),
      }
    ).pipe(
      map((result: any) => {
        return result.me;
      })
    );
  }
  setSession(token: string, expiresTimeInHours = 24) {
    const date = new Date();
    console.log('Fecha y hora ', date.toISOString());
    date.setHours(date.getHours() + expiresTimeInHours);

    const session: ISession = {
      expiresIn: new Date(date).toISOString(),
      token,
    };
    localStorage.setItem('session', JSON.stringify(session));
  }

  getSession(): ISession {
    return JSON.parse(localStorage.getItem('session'));
  }
  resetSession() {
    localStorage.removeItem('session');
    this.updateSeccion({ status: false });
  }
}
