import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '@app/modules/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, filter, of, Subject, switchMap, takeUntil } from 'rxjs';
import { LocationService } from '@app/services/location.service';
import { WeatherService } from '@app/services/weather.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { WeatherIconPipe } from '@app/pipes/weather-icon.pipe';
import { WeatherTextPipe } from '@app/pipes/weather-text.pipe';

@Component({
  selector: 'app-weather-display',
  imports: [
    MatInputModule,
    SharedModule,
    MatIconModule,
    MatAutocompleteModule,
    WeatherIconPipe,
    WeatherTextPipe
  ],
  templateUrl: './weather-display.component.html',
  styleUrl: './weather-display.component.scss'
})
export class WeatherDisplayComponent implements OnInit, OnDestroy {
  selectedLocation: string = '';
  searchValue: string = '';
  searchValue$: Subject<string> = new Subject<string>();
  unsubscribe$: Subject<void> = new Subject<void>()
  locationOptions = signal(null)
  weather = signal(null)

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.searchValue$
      .pipe(
        filter((value: string) => value.length >= 3),
        debounceTime(300),
        takeUntil(this.unsubscribe$),
        switchMap((value) => {
          this.searchValue = value;
          return this.locationService.getLocationByName(value);
        })
      )
      .subscribe((locations: any) => {
        this.locationOptions.update(() => locations)
      })
  }

  displayFn(option: any): string {
    return option ? option.display_name : '';
  }

  getWeather(selectedLocation: any) {
    this.selectedLocation = selectedLocation.display_name;

    this.weatherService.getWeatherByLocation(selectedLocation.lat, selectedLocation.lon).subscribe((weather) => {
      this.weather.update(() => weather);
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
