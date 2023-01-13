import { config } from "dotenv";
import axios from "axios";
import { IWeatherData } from "../types";
import { ITomorrowIoData } from "../types/tomorrowio";

config();

class TomorrowIoApi {
	static async getWeather(
		lat: number,
		lon: number,
	): Promise<IWeatherData | null> {
		if (!process.env.TOMORROWIO_KEY || lat === undefined || lon === undefined)
			return null;
		try {
			const response = await axios.get<ITomorrowIoData>(
				`https://api.tomorrow.io/v4/timelines?location=${lat},${lon}&fields=temperature,temperatureApparent,windSpeed&timesteps=current&units=metric&apikey=${process.env.TOMORROWIO_KEY}`,
			);

			const { temperature, temperatureApparent, windSpeed } =
				response.data.data.timelines[0].intervals[0].values;

			return {
				name: "🕸Tomorrow io",
				temperature: Math.round(temperature),
				realFeelTemperature: Math.round(temperatureApparent),
				wind: Math.round(windSpeed * 10) / 10,
			};
		} catch (e) {
			console.log(e);
			return null;
		}
	}
}

export default TomorrowIoApi;
