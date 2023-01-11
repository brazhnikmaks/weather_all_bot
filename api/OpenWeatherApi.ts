import { config } from "dotenv";
import axios from "axios";
import { CurrentConditions } from "openweather-api-node";
import { IWeatherData } from "../types";

config();

type OpenWeatherMainType = {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
};

class OpenWeatherApi {
	static async getWeather(
		lat: number,
		lon: number,
	): Promise<IWeatherData | null> {
		if (!process.env.OPENWEATHER_KEY || lat === undefined || lon === undefined)
			return null;
		try {
			const response = await axios.get<CurrentConditions>(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_KEY}&units=metric`,
			);
			const { main, wind } = response.data;
			const { temp, feels_like } = main as unknown as OpenWeatherMainType;

			console.log(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_KEY}&units=metric`,
			);
			console.log(response.data);

			return {
				name: "🌅OpenWeather",
				temperature: Math.round(temp),
				realFeelTemperature: Math.round(feels_like),
				wind: wind.speed * 10,
			};
		} catch (e) {
			console.log(e);
			return null;
		}
	}
}

export default OpenWeatherApi;
