export interface IOpenMeteoCurrentWeather {
	temperature: number;
	windspeed: number;
	winddirection: number;
	weathercode: number;
	time: string;
}

export interface IOpenMeteoData {
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	elevation: number;
	current_weather: IOpenMeteoCurrentWeather;
	hourly_units: {
		time: string;
		apparent_temperature: string;
	};
	hourly: {
		time: string[];
		apparent_temperature: number[];
	};
}
