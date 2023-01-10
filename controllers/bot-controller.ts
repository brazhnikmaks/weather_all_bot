import { Message } from "node-telegram-bot-api";
import { bot } from "../servises/telefram-service";
import WeatherService from "../servises/weather-service";
import { IWeatherData } from "../types";

// all chat icons ❄☔⛅👅💨🌞☁📍🌡️🤒

class BotController {
	constructor() {
		bot.setMyCommands([
			{ command: "/start", description: "Запуск бота" },
			{ command: "/kyiv", description: "Шо по погоді в Києві" },
			// { command: "/get_weathers", description: "Шо по погоді" },
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

	static sendError(chatId: number) {
		return bot.sendMessage(chatId, `Помилочка  ¯\\_(ツ)_/¯`);
	}

	async onMessage(msg: Message) {
		const text = msg.text;
		const chatId = msg.chat.id;

		try {
			if (text === "/start") {
				return bot.sendMessage(
					chatId,
					`Вітаю в телеграм боті погоди, скористайтеся кнопкою "Меню", щоб щось зробити`,
				);
			}

			if (text === "/kyiv") {
				bot.sendMessage(chatId!, `Чекайте, збираю інформацію...`);

				const KyivWeathers = await WeatherService.getAllKyivWeathers();

				if (!KyivWeathers.length) {
					return BotController.sendError(chatId);
				}

				return bot.sendMessage(
					chatId!,
					`Київ:${KyivWeathers.reduce(
						(weathersString, weather) =>
							(weathersString += "\n" + BotController.weatherToString(weather)),
						"",
					)}`,
					{
						parse_mode: "Markdown",
					},
				);
			}
		} catch (e) {
			console.log(e);
		}
	}
}

export default new BotController();
