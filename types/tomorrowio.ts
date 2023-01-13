export interface ITomorrowIoData {
	data: {
		timelines: {
			timestep: string;
			endTime: string;
			startTime: string;
			intervals: {
				startTime: string;
				values: {
					temperature: number;
					temperatureApparent: number;
					windSpeed: number;
				};
			}[];
		}[];
	};
}
