import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { City } from '../models/city';
import { Photo } from '../models/photo';
import { AuthService } from './auth.service';
import {AlertifyService} from './alertify.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient:HttpClient, private authService : AuthService, private alertifyService : AlertifyService, private router : Router) { }

  path = "http://localhost:5001/api/"; 

  getCities() : Observable<City[]>
  {
    return this.httpClient.get<City[]>(this.path + "cities/getall")
  }

  getCityById(cityId): Observable<City>
  {
    return this.httpClient.get<City>(this.path + "cities/detail?cityId="+cityId,{
      headers: new HttpHeaders(
        {
          'Accept'       : 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        })})
  }

  getPhotosByCity(cityId) : Observable<Photo[]>
  {
    return this.httpClient.get<Photo[]>(this.path + "cities/getPhotosByCity?cityId="+cityId, {
      headers: new HttpHeaders(
        {
          'Accept'       : 'application/json',
          'Authorization':'Bearer '+localStorage.getItem("token")
        }
      )
    });
  }
  add(city)
  {
    this.httpClient.post(this.path + "cities/add",city).subscribe();
  }
  delete(city)
  {
    if(localStorage.getItem("token") !== null)
    {
      this.httpClient.post(this.path + 'cities/delete',city,{
        headers: new HttpHeaders(
          {
            'Accept'       : 'application/json',
            'Authorization':'Bearer '+localStorage.getItem("token")
          }
        )
      }).subscribe(data  => {
        this.alertifyService.success("Başarıyla Silindi");
        this.router.navigateByUrl("/city"); 
      },
      (err) => this.alertifyService.error("Sadece kendinizin eklediği şehirleri silebilirsiniz !"));  
    }
    else
    {
      console.log(localStorage.getItem("token"));
      this.alertifyService.error("Şehir silebilmeniz için giriş yapmalısınız !");  
    }
    
  } 
}
