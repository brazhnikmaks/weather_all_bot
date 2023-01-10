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
			{ command: "/location", description: "Погода за мапою" },
		]);
	}

	static weathersToString(location: string, weathers: IWeatherData[]) {
		let weatherString = `${location ? `${location}:` : ""}`;

		weatherString += weathers.reduce((wS, weather) => {
			const { temperature, realFeelTemperature, wind, name } = weather;
			wS += `\n\n${name}\n`;
			wS += `🌡️ ${temperature}°C`;

			if (realFeelTemperature) {
				wS += `, 🤒 ${realFeelTemperature}°C`;
			}

			if (wind) {
				wS += `, 💨 ${wind} м/с`;
			}

			return wS;
		}, "");

		return weatherString;
	}

	static sendError(chatId: number) {
		bot.sendMessage(chatId, `Помилочка  ¯\\_(ツ)_/¯`);
	}

	static sendLoading(chatId: number) {
		bot.sendMessage(chatId, `Чекайте, збираю інформацію...`, {
			reply_markup: {
				remove_keyboard: true,
			},
		});
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
				BotController.sendLoading(chatId);

				const KyivWeathers = await WeatherService.getAllKyivWeathers();

				if (!KyivWeathers.length) {
					return BotController.sendError(chatId);
				}

				return bot.sendMessage(
					chatId!,
					BotController.weathersToString("Київ", KyivWeathers),
					{
						parse_mode: "Markdown",
					},
				);
			}

			if (text === "/location") {
				bot.sendMessage(
					chatId!,
					`Надішліть локацію, яка вас цікавить\nабо натисніть кнопку внизу, щоб поділитися вашею локацією\n(Задіяно менше джерел)`,
					{
						parse_mode: "Markdown",
						reply_markup: {
							one_time_keyboard: true,
							resize_keyboard: true,
							keyboard: [[{ text: "Моя локація", request_location: true }]],
						},
					},
				);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async onLocation(msg: Message) {
		const location = msg.location;
		const chatId = msg.chat.id;

		if (!location) {
			return BotController.sendError(chatId);
		}

		BotController.sendLoading(chatId);

		const weathers = await WeatherService.getWeathers(
			location.latitude,
			location.longitude,
		);

		if (!weathers.length) {
			return BotController.sendError(chatId);
		}

		return bot.sendMessage(
			chatId!,
			BotController.weathersToString("", weathers),
			{
				parse_mode: "Markdown",
			},
		);
	}
}

export default new BotController();
