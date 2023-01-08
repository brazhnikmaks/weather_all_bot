export interface IWeatherData {
	name: string;
	temperature: number;
	realFeelTemperature: number | undefined;
	wind: number | undefined;
}
