import { AccuWeatherApi, WeatherApi, OpenWeatherApi } from "../api";
import { IWeatherData } from "../types";

class WeatherService {
	async getAllKyivWeathers() {
		const weathersResponses = await Promise.all([
			AccuWeatherApi.getKyivWeather(),
			WeatherApi.getKyivWeather(),
			OpenWeatherApi.getKyivWeather(),
		]);
		const weathers: IWeatherData[] = weathersResponses.filter(
			(weatherResponse) => weatherResponse !== null,
		) as IWeatherData[] | [];

		return weathers;
	}
}

export default new WeatherService();
