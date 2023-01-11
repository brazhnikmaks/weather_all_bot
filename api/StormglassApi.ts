import axios from "axios";
import { IWeatherData } from "../types";

type StormglassValueType = { sg: number };

type StormglassDataType = {
	hours: {
		airTemperature: StormglassValueType;
		time: string;
		windSpeed: StormglassValueType;
	}[];
	meta: {
		cost: number;
		dailyQuota: number;
		end: string;
		lat: number;
		lng: number;
		params: string[];
		requestCount: number;
		start: string;
	};
};

class StormglassApi {
	static async getWeather(
		lat: number,
		lon: number,
	): Promise<IWeatherData | null> {
		if (!process.env.STORMGLASS_KEY || lat === undefined || lon === undefined)
			return null;
		try {
			const date = new Date().toISOString();
			const response = await axios.get<StormglassDataType>(
				`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lon}&params=airTemperature,windSpeed&start=${date}&end=${date}`,
				{
					headers: {
						Authorization: process.env.STORMGLASS_KEY,
					},
				},
			);

			const { airTemperature, windSpeed } = response.data.hours[0];

			return {
				name: "❄️Stormglass",
				temperature: Math.round(airTemperature.sg),
				wind: Math.round(windSpeed.sg * 10) / 10,
			};
		} catch (e) {
			console.log(e);
			return null;
		}
	}
}

export default StormglassApi;
