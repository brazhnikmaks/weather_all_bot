import axios from "axios";
import { kmph_to_mps } from "../utils/";
import { ICurrentConditionData } from "accu-weather-api-wrapper";
import { IWeatherData } from "../types";

class AccuWeatherApi {
	static async getKyivWeather(): Promise<IWeatherData | null> {
		try {
			const response = await axios.get<ICurrentConditionData[]>(
				`https://dataservice.accuweather.com/currentconditions/v1/324505?apikey=W4GAsnb6xzgpAHEjUuAs2Yict2JFUGMw&details=true`,
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
			console.log(e.response.data);
			return null;
		}
	}
}

export default AccuWeatherApi;
