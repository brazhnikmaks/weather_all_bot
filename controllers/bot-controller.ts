import { Message } from "node-telegram-bot-api";
import { bot } from "../servises/telefram-service";
import WeatherService from "../servises/weather-service";
import { IWeatherData } from "../types";

class BotController {
	constructor() {
		bot.setMyCommands([
			{ command: "/start", description: "Запуск бота" },
			{ command: "/get_weathers", description: "Шо по погоде" },
		]);
	}

	static weatherToString(weather: IWeatherData) {
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
	}

	async onMessage(msg: Message) {
		const text = msg.text;
		const chatId = msg.chat.id;

		try {
			if (text === "/start") {
				return bot.sendMessage(
					chatId,
					`Добро пожаловать в телеграм бот погоды, воспользуйтесь кнопкой "Меню" чтобы что-то сделать`,
				);
			}

			// if (text === "/get_weathers") {
			// 	const KyivWeathers = await WeatherService.getAllKyivWeathers();

			// 	if (!KyivWeathers.length) {
			// 		return bot.sendMessage(chatId!, `Ошибочка  ¯\\_(ツ)_/¯`);
			// 	}

			// 	// return bot.sendMessage(chatId!, "❄☔⛅👅💨🌞☁📍🌡️🤒")
			// 	return bot.sendMessage(
			// 		chatId!,
			// 		`Київ:${KyivWeathers.reduce(
			// 			(weathersString, weather) =>
			// 				(weathersString += "\n" + BotController.weatherToString(weather)),
			// 			"",
			// 		)}`,
			// 		{
			// 			parse_mode: "Markdown",
			// 		},
			// 	);
			// }
		} catch (e) {
			console.log(e);
		}
	}
}

export default new BotController();
