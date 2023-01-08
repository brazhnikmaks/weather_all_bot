import TelegramApi from "node-telegram-bot-api";
import { AccuWeatherApi, WeatherApi, OpenWeatherApi } from "./api";
import { IWeatherData } from "./types";

const token = "5955184773:AAHHS6MqzjcVa9NcmClJp-dYsddCXMPapq8";

const bot = new TelegramApi(token, { polling: true });

const start = async () => {
	bot.setMyCommands([
		{ command: "/start", description: "Запуск бота" },
		{ command: "/get_weathers", description: "Шо по погоде" },
	]);

	bot.on("message", async (msg) => {
		const text = msg.text;
		const chatId = msg.chat.id;

		try {
			if (text === "/start") {
				return bot.sendMessage(
					chatId,
					`Добро пожаловать в телеграм бот погоды, воспользуйтесь кнопкой "Меню" чтобы что-то сделать`,
				);
			}

			if (text === "/get_weathers") {
				const KyivWeathers = await getAllKyivWeathers();

				if (!KyivWeathers.length) {
					return bot.sendMessage(chatId!, `Ошибочка  ¯\\_(ツ)_/¯`);
				}

				// return bot.sendMessage(chatId!, "❄☔⛅👅💨🌞☁📍🌡️🤒")
				return bot.sendMessage(
					chatId!,
					`Київ:${KyivWeathers.reduce(
						(weathersString, weather) =>
							(weathersString += "\n" + parseWeather(weather)),
						"",
					)}`,
					{
						parse_mode: "Markdown",
					},
				);
			}
		} catch (e) {}
	});
};

const getAllKyivWeathers = async () => {
	const weathersResponses = await Promise.all([
		AccuWeatherApi.getKyivWeather(),
		WeatherApi.getKyivWeather(),
		OpenWeatherApi.getKyivWeather(),
	]);
	const weathers: IWeatherData[] = weathersResponses.filter(
		(weatherResponse) => weatherResponse !== null,
	) as IWeatherData[] | [];

	return weathers;
};

const parseWeather = (weather: IWeatherData) => {
	const { temperature, realFeelTemperature, wind, name } = weather;
	let weatherString = `🌡️ ${temperature}°C`;

	if (realFeelTemperature) {
		weatherString += `, 🤒 ${realFeelTemperature}°C`;
	}

	if (wind) {
		weatherString += `, 💨 ${wind} м/с`;
	}
	// return `${weatherString} - ${name}`;
	return `\n${name}\n${weatherString}`;
};

start();
