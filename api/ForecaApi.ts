import { config } from "dotenv";
import axios from "axios";
import { IWeatherData } from "../types";
import { IForecaData } from "../types/foreca";

config();

class ForecaApi {
	static async getWeather(
		lat: number,
		lon: number,
	): Promise<IWeatherData | null> {
		if (!process.env.FORECA_KEY || lat === undefined || lon === undefined)
			return null;
		try {
			const response = await axios.get<IForecaData>(
				`https://pfa.foreca.com/api/v1/current/${lon},${lat}`,
				{
					headers: {
						Authorization: `Bearer ${process.env.FORECA_KEY}`,
					},
				},
			);

			const { temperature, feelsLikeTemp, windSpeed } = response.data.current;

			return {
				name: "☀️Foreca",
				temperature: Math.round(temperature),
				realFeelTemperature: Math.round(feelsLikeTemp),
				wind: Math.round((windSpeed * 10) / 10),
			};
		} catch (e) {
			// @ts-ignore
			console.log(e.data);
			return null;
		}
	}
}

export default ForecaApi;
