import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {
  }

  getLocationByName(locationName: string) {
    return this.http.get(`https://nominatim.openstreetmap.org/search?q=${locationName}&format=json`)
  }
}
