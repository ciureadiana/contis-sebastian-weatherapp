import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherText'
})
export class WeatherTextPipe implements PipeTransform {
  transform(weatherCode: number): string {
    if (weatherCode === 0) return 'Clear sky';
    if (weatherCode >= 1 && weatherCode >= 3) return 'Partly cloudy';
    if (weatherCode === 45 || weatherCode === 48) return 'Fog';
    if (weatherCode >= 51 && weatherCode <= 57) return 'Drizzle';
    if (weatherCode >= 61 && weatherCode <= 67) return 'Rain';
    if (weatherCode >= 71 && weatherCode <= 77) return 'Snowfall';
    if (weatherCode >= 80 && weatherCode <= 82) return 'Showers';
    if (weatherCode >= 95 && weatherCode <= 99) return 'Thunderstorm';

    return 'No weather condition'; // Fallback class
  }
}
