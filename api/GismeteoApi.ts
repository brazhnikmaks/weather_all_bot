import axios from "axios";
import { IWeatherData } from "../types";

class GismeteoApi {
	static async getKyivWeather(): Promise<IWeatherData | null> {
		try {
			const response = await axios.get(
				"https://www.gismeteo.ua/weather-kyiv-4944/",
			);

			const page = response.data as string;

			//get temperature
			const tMatch = page.match(
				/weather-value[\s\S\n]*?sign[^>]+>\s*(.*?)\s*<[^>]+>[\s\n]*(\d+)/,
			);
			if (!tMatch) {
				return null;
			}
			const [_, tSign, temperature] = tMatch;

			//get feel temperature
			const fMatch = page.match(
				/weather-feel[\s\S\n]*?sign[^>]+>\s*(.*?)\s*<[^>]+>[\s\n]*(\d+)/,
			);

			const times = [2, 5, 8, 11, 14, 17, 20, 23];
			let wind, windWrapMatch, windMatch;
			windWrapMatch = page.match(/data-key="wind-speed-gust"[\s\S\n]*?widget/);

			//get wind
			if (windWrapMatch) {
				windMatch = [
					...windWrapMatch[0].matchAll(
						/row-item[\s\S\n]*?unit_wind_m_s[^>]+>\s*(.*?)\s*</g,
					),
				];

				if (windMatch.length) {
					const hour = new Date(Date.now() + 7200000).getHours();
					let minDiff = 24;
					let minDiffIndex = 0;
					times.forEach((time, index) => {
						const diff = Math.abs(hour - time);
						if (minDiff > diff) {
							minDiff = diff;
							minDiffIndex = index;
						}
					});
					wind = windMatch[minDiffIndex][1] as string;
				}
			}

			return {
				name: "Gismeteo",
				temperature: tSign === "&minus;" ? `-${temperature}` : temperature,
				realFeelTemperature: fMatch
					? fMatch[1] === "&minus;"
						? `-${fMatch[2]}`
						: fMatch[2]
					: undefined,
				wind,
			};
		} catch (e) {
			// @ts-ignore
			// console.log(e.response.data);
			return null;
		}
	}
}

export default GismeteoApi;
