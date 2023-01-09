import axios from "axios";
import { kmph_to_mps } from "../utils/";
import { IWeatherData } from "../types";

class WeatherApi {
	static async getKyivWeather(): Promise<IWeatherData | null> {
		try {
			const response = await axios.get(
				`https://api.weatherapi.com/v1/current.json?key=5980147f5a754ee6a93132626230801&q=50.4586708,30.5818284`,
			);

			const { current } = response.data;

			return {
				name: "💧weather api",
				temperature: Math.round(current.temp_c),
				realFeelTemperature: Math.round(current.feelslike_c),
				wind: Math.round(kmph_to_mps(current.wind_kph) * 10) / 10,
			};
		} catch (e) {
			return null;
		}
	}
}

export default WeatherApi;
