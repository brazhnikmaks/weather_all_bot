import {
  AccuWeatherApi,
  WeatherApi,
  OpenWeatherApi,
  GismeteoApi,
  MeteomaticsApi,
  OpenMeteoApi,
  TomorrowIoApi,
  StormglassApi,
  // AzureApi,
  // ForecaApi,
} from "../api";
import { IWeatherData } from "../types";

class WeatherService {
  async getWeathers(lat: number, lon: number): Promise<IWeatherData[]> {
    const weathersResponses = await Promise.all([
      AccuWeatherApi.getWeather(lat, lon),
      // ForecaApi.getWeather(lat, lon),
      // AzureApi.getWeather(lat, lon),
      WeatherApi.getWeather(lat, lon),
      OpenWeatherApi.getWeather(lat, lon),
      MeteomaticsApi.getWeather(lat, lon),
      OpenMeteoApi.getWeather(lat, lon),
      TomorrowIoApi.getWeather(lat, lon),
      StormglassApi.getWeather(lat, lon),
    ]);
    const weathers: IWeatherData[] = weathersResponses.filter(
      (weatherResponse) => weatherResponse !== null,
    ) as IWeatherData[] | [];

    return weathers;
  }

  async getAllKyivWeathers(): Promise<IWeatherData[]> {
    const lat = 50.459532;
    const lon = 30.589909;

    const [weathers, gismeteoKyivWeather] = await Promise.all([
      this.getWeathers(lat, lon),
      GismeteoApi.getKyivWeather(),
    ]);

    if (gismeteoKyivWeather) {
      weathers.push(gismeteoKyivWeather);
    }

    return weathers;
  }
}

export default new WeatherService();
