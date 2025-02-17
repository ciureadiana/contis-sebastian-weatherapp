import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherIcon'
})
export class WeatherIconPipe implements PipeTransform {
  transform(weatherCode: number): string {
    if (weatherCode === 0) return 'sunny';
    if (weatherCode >= 1 && weatherCode <= 3) return 'partly_cloudy_day';
    if (weatherCode === 45 || weatherCode === 48) return 'foggy';
    if (weatherCode >= 51 && weatherCode <= 57) return 'weather-mix';
    if (weatherCode >= 61 && weatherCode <= 67) return 'rainy';
    if (weatherCode >= 71 && weatherCode <= 77) return 'ac_unit';
    if (weatherCode >= 80 && weatherCode <= 82) return 'sunny-snowing';
    if (weatherCode >= 95 && weatherCode <= 99) return 'thunderstorm';

    return 'cloud-alert'; // Fallback class
  }
}
