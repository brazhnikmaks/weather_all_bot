export interface IWeatherUnit {
	/**
	 * Type of unit for the returned value.
	 */
	unit: string;
	/**
	 * Numeric ID value associated with the type of unit being displayed. Can be used for unit translation.
	 */
	unitType: number;
	/**
	 * Rounded value.
	 */
	value: number;
}

export interface IPrecipitationSummary {
	/**
	 * The amount of precipitation (liquid equivalent) that has fallen in the past 18 hours.
	 */
	pastEighteenHours: IWeatherUnit;
	/**
	 * The amount of precipitation (liquid equivalent) that has fallen in the past hour.
	 */
	pastHour: IWeatherUnit;
	/**
	 * The amount of precipitation (liquid equivalent) that has fallen in the past nine hours.
	 */
	pastNineHours: IWeatherUnit;
	/**
	 * The amount of precipitation (liquid equivalent) that has fallen in the past six hours. Contains Metric and Imperial Values.
	 */
	pastSixHours: IWeatherUnit;
	/**
	 * The amount of precipitation (liquid equivalent) that has fallen in the past three hours.
	 */
	pastThreeHours: IWeatherUnit;
	/**
	 * The amount of precipitation (liquid equivalent) that has fallen in the past 12 hours.
	 */
	pastTwelveHours: IWeatherUnit;
	/**
	 * The amount of precipitation (liquid equivalent) that has fallen in the past 24 hours.
	 */
	pastTwentyFourHours: IWeatherUnit;
}

export interface IPressureTendency {
	/**
	 * Pressure tendency code regardless of language. One of F=Falling, S=Steady, R=Rising.
	 */
	code: string;
	/**
	 * Description of the pressure tendency in specified language
	 */
	localizedDescription: string;
}

export interface IPastHoursTemperature {
	/**
	 * maximum
	 */
	maximum: IWeatherUnit;
	/**
	 * minimum
	 */
	minimum: IWeatherUnit;
}

export interface ITemperatureSummary {
	/**
	 * Summary of temperature fluctuations over the past 6 hours.
	 */
	pastSixHours: IPastHoursTemperature;
	/**
	 * Summary of temperature fluctuations over the past 12 hours.
	 */
	pastTwelveHours: IPastHoursTemperature;
	/**
	 * Summary of temperature fluctuations over the past 24 hours.
	 */
	pastTwentyFourHours: IPastHoursTemperature;
}

export interface IWindDirection {
	/**
	 * Wind direction in Azimuth degrees, starting at true North and continuing in clockwise direction. North is 0 degrees, east is 90 degrees, south is 180 degrees, west is 270 degrees. Possible values 0-359.
	 */
	degrees: number;
	/**
	 * Direction abbreviation in the specified language.
	 */
	localizedDescription: string;
}

export interface IWindDetails {
	/**
	 * Wind direction.
	 */
	direction: IWindDirection;
	/**
	 * Speed of the wind in specified unit.
	 */
	speed: IWeatherUnit;
}

export interface ICurrentConditions {
	/**
	 * Perceived outdoor temperature caused by the combination of air temperature, relative humidity, and wind speed in specified unit.
	 */
	apparentTemperature: IWeatherUnit;
	/**
	 * Cloud ceiling in specified unit. The ceiling is a measurement of the height of the base of the lowest clouds.
	 */
	ceiling: IWeatherUnit;
	/**
	 * Percent representing cloud cover.
	 */
	cloudCover: number;
	/**
	 * Date and time of the current observation displayed in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00.
	 */
	dateTime: string;
	/**
	 * The dewpoint temperature in specified unit. The dewpoint temperature is the temperature that the air must be cooled to in order to reach saturation.
	 */
	dewPoint: IWeatherUnit;
	/**
	 * Indicates the presence or absence of precipitation. True indicates the presence of precipitation, false indicates the absence of precipitation.
	 */
	hasPrecipitation: boolean;
	/**
	 * Numeric value representing an image that displays the iconPhrase.
	 */
	iconCode: number;
	/**
	 * Indicates the time of the day. True indicates 'day',', false indicates 'night.
	 */
	isDayTime: boolean;
	/**
	 * Cause of limited visibility.
	 */
	obstructionsToVisibility: string;
	/**
	 * Departure from the temperature observed 24 hours ago in specified unit.
	 */
	pastTwentyFourHourTemperatureDeparture: IWeatherUnit;
	/**
	 * Phrase description of the current weather condition. Displayed in specified language.
	 */
	phrase: string;
	/**
	 * Summary of precipitation amounts over the past 24 hours.
	 */
	precipitationSummary: IPrecipitationSummary;
	/**
	 * Atmospheric pressure in specified unit.
	 */
	pressure: IWeatherUnit;
	/**
	 * Atmospheric pressure change.
	 */
	pressureTendency: IPressureTendency;
	/**
	 * RealFeel™ Temperature being returned.
	 */
	realFeelTemperature: IWeatherUnit;
	/**
	 * RealFeel™ Temperature being returned. Describes what the temperature really feels like in the shade.
	 */
	realFeelTemperatureShade: IWeatherUnit;
	/**
	 * Relative humidity is the amount of water vapor present in air expressed as a percentage of the amount needed for saturation at the same temperature.
	 */
	relativeHumidity: number;
	/**
	 * Temperature being returned.
	 */
	temperature: IWeatherUnit;
	/**
	 * Summary of temperature fluctuations over the past 6, 12, and 24 hours.
	 */
	temperatureSummary: ITemperatureSummary;
	/**
	 * Measure of the strength of the ultraviolet radiation from the sun. Supported values are:
			0-2 - Low danger from the sun's UV rays or the average person.
			3-5 - Moderate risk of harm from unprotected sun exposure.
			6-7 - High risk of harm from unprotected sun exposure.
			8-10 - Very high risk of harm from unprotected sun exposure.
			11+ - Extreme risk of harm from unprotected sun exposure.
	 */
	uvIndex: number;
	/**
	 * Phrase associated with the uvIndex.
	 */
	uvIndexPhrase: string;
	/**
	 * Visibility in specified unit. A measure of the distance at which an object or light can be clearly discerned.
	 */
	visibility: IWeatherUnit;
	/**
	 * The temperature to which air may be cooled by evaporating water into it at constant pressure until it reaches saturation.
	 */
	wetBulbTemperature: IWeatherUnit;
	/**
	 * Wind details being returned including speed and direction.
	 */
	wind: IWindDetails;
	/**
	 * Perceived air temperature on exposed skin due to wind.
	 */
	windChillTemperature: IWeatherUnit;
	/**
	 * Wind gust. Wind gust is a sudden, brief increase in speed of the wind.
	 */
	windGust: IWindDetails;
}

export interface ICurrentConditionsResult {
	/**
	 * Detailed current weather conditions.
	 */
	results: ICurrentConditions[];
}
