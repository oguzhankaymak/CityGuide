import {CityComponent} from './city/city.component';
import {Routes} from '@angular/router';
import {CityDetailComponent} from './city/city-detail/city-detail.component';
import { from } from 'rxjs';
import { CityAddComponent } from './city/city-add/city-add.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service'

export const appRoutes : Routes  = [
    { path:"city", component:CityComponent },
    { path:"register", component:RegisterComponent },
    { path:"cityAdd", component:CityAddComponent, canActivate: [AuthGuard] },
    { path:"cityDetail/:cityId", component:CityDetailComponent, canActivate: [AuthGuard] },
    { path:"**", redirectTo:"city", pathMatch:"full" }
];

