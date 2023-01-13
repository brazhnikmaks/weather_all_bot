import { config } from "dotenv";
import axios from "axios";
import { CurrentConditions } from "openweather-api-node";
import { IWeatherData } from "../types";
import { IOpenWeatherMain } from "../types/openweather";

config();

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
			const { temp, feels_like } = main as unknown as IOpenWeatherMain;

			return {
				name: "🌅OpenWeather",
				temperature: Math.round(temp),
				realFeelTemperature: Math.round(feels_like),
				wind: (Math.round(wind.speed * 10) / 10).toFixed(1),
			};
		} catch (e) {
			console.log(e);
			return null;
		}
	}
}

export default OpenWeatherApi;
