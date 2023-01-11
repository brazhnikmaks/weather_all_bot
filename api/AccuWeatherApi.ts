import { config } from "dotenv";
import axios from "axios";
import { kmph_to_mps } from "../utils/";
import { ICurrentConditionData, ICityData } from "accu-weather-api-wrapper";
import { IWeatherData } from "../types";

config();

class AccuWeatherApi {
	static async getWeather(
		lat: number,
		lon: number,
	): Promise<IWeatherData | null> {
		if (!process.env.ACCUWEATHER_KEY || lat === undefined || lon === undefined)
			return null;

		//place Kyiv as default
		let placeId: number | string = 324505;
		if (lat !== 50.459532 || lon !== 30.589909) {
			try {
				// search place key by lat and lon
				const responseL = await axios.get<ICityData>(
					`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.ACCUWEATHER_KEY}&details=true&q=${lat},${lon}`,
				);
				const { Details } = responseL.data;
				if (Details) {
					placeId = Details.Key;
				}
			} catch (e) {
				// @ts-ignore
				// console.log("location", e.response.data);
				return null;
			}
		}

		try {
			const responseT = await axios.get<ICurrentConditionData[]>(
				`https://dataservice.accuweather.com/currentconditions/v1/${placeId}?apikey=${process.env.ACCUWEATHER_KEY}&details=true`,
			);
			const { Temperature, RealFeelTemperature, Wind } = responseT.data[0];

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
			// console.log("weather", e.response.data);
			return null;
		}
	}
}

export default AccuWeatherApi;
