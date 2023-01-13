export interface IMeteomaticsParam {
	parameter: string;
	coordinates: {
		lat: number;
		lon: number;
		dates: {
			date: string;
			value: number;
		}[];
	}[];
}

export interface IMeteomaticsData {
	version: string;
	user: string;
	dateGenerated: string;
	status: string;
	data: IMeteomaticsParam[];
}
