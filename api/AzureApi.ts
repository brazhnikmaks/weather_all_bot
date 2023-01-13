import { config } from "dotenv";
import axios from "axios";
import { kmph_to_mps } from "../utils/";
import { IWeatherData } from "../types";
import { ICurrentConditionsResult } from "../types/azure";

config();

class AzureApi {
	static async getWeather(
		lat: number,
		lon: number,
	): Promise<IWeatherData | null> {
		if (!process.env.AZURE_KEY || lat === undefined || lon === undefined)
			return null;
		try {
			const response = await axios.get<ICurrentConditionsResult>(
				`https://atlas.microsoft.com/weather/currentConditions/json?api-version=1.1&query=${lat},${lon}&unit=metric&details=true&duration=0&subscription-key=${process.env.AZURE_KEY}`,
			);

			const { temperature, wind, realFeelTemperature } =
				response.data.results[0];

			return {
				name: "⟁Azure Maps",
				temperature: Math.round(temperature.value),
				realFeelTemperature: Math.round(realFeelTemperature.value),
				wind: Math.round(kmph_to_mps(wind.speed.value * 10) / 10),
			};
		} catch (e) {
			// @ts-ignore
			console.log(e);
			return null;
		}
	}
}

export default AzureApi;
