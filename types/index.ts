export interface IWeatherData {
	name: string;
	temperature: number | string;
	realFeelTemperature: number | string | undefined;
	wind: number | string | undefined;
}
