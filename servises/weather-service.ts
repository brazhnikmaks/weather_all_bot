import { AccuWeatherApi, WeatherApi, OpenWeatherApi } from "../api";
import { IWeatherData } from "../types";

class WeatherService {
	async getWeathers(lat: number, lon: number): Promise<IWeatherData[]> {
		const weathersResponses = await Promise.all([
			WeatherApi.getWeather(lat, lon),
			OpenWeatherApi.getWeather(lat, lon),
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

		//only Kyiv weathers
		const accuweatherKyivWeather = await AccuWeatherApi.getKyivWeather();
		if (accuweatherKyivWeather) {
			KyivWeathers.push(accuweatherKyivWeather);
		}

		//weather by lat + lon
		const otherWeathers = await this.getWeathers(lat, lon);
		KyivWeathers.push(...otherWeathers);

		return KyivWeathers;
	}
}

export default new WeatherService();
