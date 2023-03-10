import axios from "axios";
import { kmph_to_mps } from "../utils/";
import { IWeatherData } from "../types";
import { IOpenMeteoData } from "../types/openmeteo";

class OpenMeteoApi {
	static async getWeather(
		lat: number,
		lon: number,
	): Promise<IWeatherData | null> {
		if (lat === undefined || lon === undefined) return null;
		try {
			const response = await axios.get<IOpenMeteoData>(
				`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=apparent_temperature`,
			);

			const {
				current_weather: { time, temperature, windspeed },
				hourly,
			} = response.data;

			const timeIndex = hourly.time.indexOf(time);
			const feelTemperature = hourly.apparent_temperature[timeIndex];

			return {
				name: "⛅️Open-Meteo",
				temperature: Math.round(temperature),
				realFeelTemperature: Math.round(feelTemperature),
				wind: Math.round(kmph_to_mps(windspeed) * 10) / 10,
			};
		} catch (e) {
			console.log(e);
			return null;
		}
	}
}

export default OpenMeteoApi;
