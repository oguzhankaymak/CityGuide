import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers : [AuthService]
})
export class NavComponent implements OnInit {

  constructor(private authService : AuthService) { }

  loginUser:any = {}

  ngOnInit() {
  }

  login()
  {
    this.authService.login(this.loginUser);
  }

  logOut()
  {
    this.authService.logOut();
  }

  get isAuthenticated()
  {
    return this.authService.loggedIn();
  }

}
