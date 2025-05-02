import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { ApiService } from '@graphql/service/api.service';
import { CREATE_CUSTOMER_STRIPE } from '@graphql/operations/mutations/stripe/customer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends ApiService {


  constructor(apollo: Apollo) {
    super(apollo);
  }


  add(name: string, email: string) {
    return this.set(
      CREATE_CUSTOMER_STRIPE,
      { name, email }
    ).pipe(map((result: any) => {
      return result.createCustomer;

    }))
  }
}
