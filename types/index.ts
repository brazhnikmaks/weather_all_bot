export interface IWeatherData {
	name: string;
	temperature: number | string;
	realFeelTemperature?: number | string;
	wind?: number | string;
}
