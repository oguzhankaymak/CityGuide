import { Injectable } from '@angular/core';
import {LoginUser} from'../models/LoginUser';
import { from } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import {RegisterUser} from '../models/registerUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  path = "http://localhost:5001/api/auth/"
  userToken : any;
  decodedToken : any;
  jwtHelper :JwtHelperService = new JwtHelperService();
  TOKEN_KEY = "token";
  constructor(
    private httpClient : HttpClient, 
    private router : Router,
    private alertifyService : AlertifyService) { }

  login(loginUser:LoginUser)
  {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type","application/json")
      this.httpClient.post(this.path + "login",loginUser,{headers:headers})
      .subscribe(data => 
      {
        this.saveToken(data["token"]);
        this.userToken = data["token"];
        this.decodedToken = this.jwtHelper.decodeToken(data["token"]);
        this.alertifyService.success("Sisteme Giriş Yapıldı");
        this.router.navigateByUrl('/city');
        
      },(err) => this.alertifyService.error("Kullanıcı Adınız Veya Şifreniz Yanlış"));

      
  }

  register(registerUser : RegisterUser)
  {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type","application/json")
      this.httpClient
        .post(this.path + "register",registerUser,{headers:headers})
        .subscribe(data => 
          {
            this.alertifyService.success("Başarıyla Kayıt Oldunuz"); 
            this.saveToken(data["token"]);
            this.userToken = data["token"];
            this.decodedToken = this.jwtHelper.decodeToken(data["token"]);    
            this.router.navigateByUrl('/city');      

          },(err) => this.alertifyService.error("Kayıt başarısız tekrar deneyiniz !"))
  }
  saveToken(token)
  {
    localStorage.setItem(this.TOKEN_KEY,token);
  }

  logOut()
  {
    this.alertifyService.success("Başarılı Bir Şekilde Çıkış Yapıldı");
    localStorage.removeItem(this.TOKEN_KEY);
  }

  loggedIn()
  {
    const token: string = this.getToken();

    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  getToken()
  {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  getCurrentUserId()
  {
    return this.jwtHelper.decodeToken(this.getToken())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }
}

