import { config } from "dotenv";
import axios from "axios";
import { kmph_to_mps } from "../utils/";
import { ICurrentConditionData } from "accu-weather-api-wrapper";
import { IWeatherData } from "../types";

config();

// search place key for lat lon
// `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.ACCUWEATHER_KEY}&details=true&q=${lat},${lon}`,

class AccuWeatherApi {
	static async getKyivWeather(): Promise<IWeatherData | null> {
		if (!process.env.ACCUWEATHER_KEY) return null;
		try {
			const response = await axios.get<ICurrentConditionData[]>(
				`https://dataservice.accuweather.com/currentconditions/v1/324505?apikey=${process.env.ACCUWEATHER_KEY}&details=true`,
			);
			const { Temperature, RealFeelTemperature, Wind } = response.data[0];

			return {
				name: "🌞AccuWeather",
				temperature: Math.round(Temperature.Metric.Value),
				realFeelTemperature:
					RealFeelTemperature && Math.round(RealFeelTemperature.Metric.Value),
				wind:
					Wind && Math.round(kmph_to_mps(Wind.Speed.Metric.Value) * 10) / 10,
			};
		} catch (e) {
			// @ts-ignore
			// console.log(e.response.data);
			return null;
		}
	}
}

export default AccuWeatherApi;
