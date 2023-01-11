import { config } from "dotenv";
import axios from "axios";
import { IWeatherData } from "../types";

config();

type IMeteomaticsParameter = {
	parameter: string;
	coordinates: {
		lat: number;
		lon: number;
		dates: {
			date: string;
			value: number;
		}[];
	}[];
};

type IMeteomaticsData = {
	version: string;
	user: string;
	dateGenerated: string;
	status: string;
	data: IMeteomaticsParameter[];
};

class MeteomaticsApi {
	static async getWeather(
		lat: number,
		lon: number,
	): Promise<IWeatherData | null> {
		if (!process.env.METEOMATICS_AUTH || lat === undefined || lon === undefined)
			return null;
		try {
			const response = await axios.get<IMeteomaticsData>(
				`https://${
					process.env.METEOMATICS_AUTH
				}@api.meteomatics.com/${new Date().toISOString()}/t_2m:C,wind_speed_10m:ms/${lat},${lon}/json`,
			);
			const { data } = response.data;

			let temperature: number, wind: number;
			data.forEach((p) => {
				switch (p.parameter) {
					case "t_2m:C":
						temperature = p.coordinates[0].dates[0].value;
						break;
					case "wind_speed_10m:ms":
						wind = p.coordinates[0].dates[0].value;
						break;
					default:
						break;
				}
			});

			if (temperature! === undefined) return null;

			return {
				name: "🔆Meteomatics",
				temperature: Math.round(temperature),
				wind: wind! && (Math.round(wind * 10) / 10).toFixed(1),
			};
		} catch (e) {
			console.log(e);
			return null;
		}
	}
}

export default MeteomaticsApi;
