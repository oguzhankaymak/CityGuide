import { Component, OnInit } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {AlertifyService} from '../services/alertify.service';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {Photo} from '../models/photo';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css'],
  providers:[]
})
export class FotoComponent implements OnInit {

  constructor(
    private alertifyService : AlertifyService,
    private authService : AuthService,
    private activatedRoot : ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit() {

    this.activatedRoot.params.subscribe(params => 
      {
        this.currentCity = params["cityId"]
      });
  }

  title = 'dropzone';
  currentCity: any; 
  files: File[] = [];
  baseUrl = "http://localhost:5001/api/"

  onSelect(event) {

    console.log(event);

    this.files.push(...event.addedFiles);

    const formData = new FormData();



    for (var i = 0; i < this.files.length; i++) { 

      formData.append("files", this.files[i]);

    }


    console.log(formData);
    this.http.post(this.baseUrl + 'cities/' + this.currentCity + '/photos/addPhoto', formData,{
      headers: new HttpHeaders(
        {
          'Access-Control-Allow-Methods': 'POST',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        })})

    .subscribe(res => {

       this.alertifyService.success('Yükleme Başarılı');

    },(err) => this.alertifyService.error("Sadece kendinizin oluşturduğu şehirlere resim yükleyebilirsiniz!!"))

}
onRemove(event) {

    console.log(event);

    this.files.splice(this.files.indexOf(event), 1);

}
}
