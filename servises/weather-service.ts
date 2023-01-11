import {
	AccuWeatherApi,
	WeatherApi,
	OpenWeatherApi,
	GismeteoApi,
	MeteomaticsApi,
	OpenMeteoApi,
	TomorrowIoApi,
} from "../api";
import { IWeatherData } from "../types";

class WeatherService {
	async getWeathers(lat: number, lon: number): Promise<IWeatherData[]> {
		const weathersResponses = await Promise.all([
			// AccuWeatherApi.getWeather(lat, lon),
			WeatherApi.getWeather(lat, lon),
			OpenWeatherApi.getWeather(lat, lon),
			MeteomaticsApi.getWeather(lat, lon),
			OpenMeteoApi.getWeather(lat, lon),
			TomorrowIoApi.getWeather(lat, lon),
		]);
		const weathers: IWeatherData[] = weathersResponses.filter(
			(weatherResponse) => weatherResponse !== null,
		) as IWeatherData[] | [];

		return weathers;
	}

	async getAllKyivWeathers(): Promise<IWeatherData[]> {
		const lat = 50.459532;
		const lon = 30.589909;
		const KyivWeathers: IWeatherData[] = [];

		//weather by lat + lon
		const otherWeathers = await this.getWeathers(lat, lon);
		KyivWeathers.push(...otherWeathers);

		//only Kyiv weathers
		const gismeteoKyivWeather = await GismeteoApi.getKyivWeather();
		if (gismeteoKyivWeather) {
			KyivWeathers.push(gismeteoKyivWeather);
		}

		return KyivWeathers;
	}
}

export default new WeatherService();
