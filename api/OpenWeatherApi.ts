import axios from "axios";
import { CurrentConditions } from "openweather-api-node";
import { IWeatherData } from "../types";

type OpenWeatherMainType = {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
};

class OpenWeatherApi {
	static async getKyivWeather(): Promise<IWeatherData | null> {
		try {
			const response = await axios.get<CurrentConditions>(
				`https://api.openweathermap.org/data/2.5/weather?lat=50.4586708&lon=30.5818284&appid=b0bdd46a984f1f1fd15cefdd8c1247df&units=metric`,
			);
			const { main, wind } = response.data;
			const { temp, feels_like } = main as unknown as OpenWeatherMainType;

			return {
				name: "🌅OpenWeather",
				temperature: Math.round(temp),
				realFeelTemperature: Math.round(feels_like),
				wind: +(Math.round(wind.speed * 100) / 10).toFixed(1),
			};
		} catch (e) {
			console.log(e);
			return null;
		}
	}
}

export default OpenWeatherApi;
