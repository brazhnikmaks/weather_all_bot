export interface IStormglassValue {
	sg: number;
}

export interface IStormglassData {
	hours: {
		airTemperature: IStormglassValue;
		time: string;
		windSpeed: IStormglassValue;
	}[];
	meta: {
		cost: number;
		dailyQuota: number;
		end: string;
		lat: number;
		lng: number;
		params: string[];
		requestCount: number;
		start: string;
	};
}
