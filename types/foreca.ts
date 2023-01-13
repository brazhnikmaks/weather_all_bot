export interface IForecaCurrent {
	/**
	 * ISO 8601 date and time
	 */
	time: string;
	/**
	 * Weather symbol code
	 */
	symbol: string;
	/**
	 * Description of weather symbol
	 */
	symbolPhrase: string;
	/**
	 * Temperature (°C or requested unit)
	 */
	temperature: number;
	/**
	 * Feels like temperature (°C or requested unit)
	 */
	feelsLikeTemp: number;
	/**
	 * Relative humidity (%)
	 */
	relHumidity: number;
	/**
	 * Dew point (°C or requested unit)
	 */
	dewPoint: number;
	/**
	 * Wind speed (m/s or requested unit)
	 */
	windSpeed: number;
	/**
	 * Wind direction (N, NE, E, SE, S, SW, W, NW)
	 */
	windDir: number;
	/**
	 * Wind gust (m/s or requested unit)
	 */
	windDirString: string;
	/**
	 * Probability of precipitation (%)
	 */
	windGust: number;
	/**
	 * Probability of precipitation (%)
	 */
	precipProb: number;
	/**
	 * Intensity of precipitation rate (mm/h)
	 */
	precipRate: number;
	/**
	 * Cloudiness (%)
	 */
	cloudiness: number;
	/**
	 * Probability of thunder nearby (%)
	 */
	thunderProb: number;
	/**
	 * UV index
	 */
	uvIndex: number;
	/**
	 * Atmospheric pressure normalized to sea level (hPa)
	 */
	pressure: number;
	/**
	 * Visibility (m)
	 */
	visibility: number;
}

export interface IForecaData {
	current: IForecaCurrent;
}
