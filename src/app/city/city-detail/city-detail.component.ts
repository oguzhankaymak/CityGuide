import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { from } from 'rxjs';
import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/models/city';
import {NgxGalleryOptions , NgxGalleryImage, NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { Photo } from 'src/app/models/photo';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css'],
  providers:[CityService]
})

export class CityDetailComponent implements OnInit {

  constructor(private activatedRoot : ActivatedRoute, private cityService : CityService)
  {}
  
  city : City;
  photos : Photo[];

  ngOnInit() {
    this.activatedRoot.params.subscribe(params => 
      {
        this.getCityById(params["cityId"]);
        this.getPhotosByCity(params["cityId"]);
      });
  }

  getCityById(cityId)
  {
    this.cityService.getCityById(cityId).subscribe(data => {
     this.city = data;
    })
  }

  getPhotosByCity(cityId)
  {
    this.cityService.getPhotosByCity(cityId).subscribe(data => {
      this.photos = data;
    })  
  }

}
