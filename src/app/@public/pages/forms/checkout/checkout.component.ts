import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IMeData } from '@core/interfaces/session.interface';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  meData: IMeData;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.accessVar$.subscribe((data: IMeData) => {
      if (!data.status) {
        //Ir a login
        this.router.navigate(['/login'])
        return;
      }
      this.meData = data;
    });
  }

  ngOnInit(): void {
    this.auth.start();
  }

}
