import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@app/features').then(component => component.WeatherDisplayComponent)
  }
];
