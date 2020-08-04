import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { appRoutes } from './routes';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertifyService} from './services/alertify.service';
import { QuillModule } from 'ngx-quill';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { CityComponent } from './city/city.component';
import { CityDetailComponent} from './city/city-detail/city-detail.component';
import {CityAddComponent} from './city/city-add/city-add.component';
import {HttpClientModule} from '@angular/common/http';
import { from } from 'rxjs';
import { RegisterComponent } from './register/register.component';
import { FotoComponent } from './foto/foto.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

export class CustomHammerConfig extends HammerGestureConfig {
   overrides = {
     'pan': {
       direction: Hammer.DIRECTION_ALL,
     }
   }
 }

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      CityComponent,
      CityDetailComponent,
      CityAddComponent,
      RegisterComponent,
      FotoComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      FormsModule,
      ReactiveFormsModule,
      QuillModule.forRoot(),
      NgxDropzoneModule,
      NgxFileDropModule
   ],
   providers: [
      AlertifyService,
      {provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig}
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
