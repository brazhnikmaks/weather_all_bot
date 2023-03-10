import { config } from "dotenv";
import axios from "axios";
import { kmph_to_mps } from "../utils/";
import { IWeatherData } from "../types";
import { IWeatherApiData } from "../types/weatherapi";

config();

class WeatherApi {
	static async getWeather(
		lat: number,
		lon: number,
	): Promise<IWeatherData | null> {
		if (!process.env.WEATHERAPI_KEY || lat === undefined || lon === undefined)
			return null;
		try {
			const response = await axios.get<IWeatherApiData>(
				`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_KEY}&q=${lat},${lon}`,
			);

			const { current } = response.data;

			return {
				name: "💧weather api",
				temperature: Math.round(current.temp_c),
				realFeelTemperature: Math.round(current.feelslike_c),
				wind: Math.round(kmph_to_mps(current.wind_kph) * 10) / 10,
			};
		} catch (e) {
			console.log(e);
			return null;
		}
	}
}

export default WeatherApi;
