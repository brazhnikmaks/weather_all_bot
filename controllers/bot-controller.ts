import {
	Message,
	SendMessageOptions,
	KeyboardButton,
} from "node-telegram-bot-api";
import TelegramBot from "../servises/telefram-service";
import WeatherService from "../servises/weather-service";
import { IWeatherData } from "../types";

class BotController {
	constructor() {
		this.setCommands();
	}

	async setCommands() {
		await TelegramBot.setMyCommands([
			{ command: "/kyiv", description: "Шо по погоді в Києві" },
			{ command: "/location", description: "Погода за мапою" },
		]);
	}

	setReplyKeyboard(): SendMessageOptions {
		const keyboard: KeyboardButton[][] = [];

		keyboard.push(
			[
				{
					text: "Шо по погоді в Києві",
				},
			],
			// [
			// 	{
			// 		text: "Погода за мапою",
			// 	},
			// ],
		);

		return {
			reply_markup: {
				resize_keyboard: true,
				keyboard,
			},
		};
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

	async sendError(chatId: number) {
		await TelegramBot.sendMessage(chatId, `Помилочка  ¯\\_(ツ)_/¯`);
	}

	async sendLoading(chatId: number, options?: SendMessageOptions) {
		await TelegramBot.sendMessage(
			chatId,
			`Чекайте, збираю інформацію...`,
			options,
		);
	}

	async onStart(chatId: number) {
		await this.setCommands();
		return await TelegramBot.sendMessage(
			chatId,
			`Вітаю в телеграм боті погоди, скористайтеся кнопкою "Меню" або кнопками внизу, щоб щось зробити.`,
			this.setReplyKeyboard(),
		);
	}

	async onKyiv(chatId: number) {
		await this.sendLoading(chatId);

		const KyivWeathers = await WeatherService.getAllKyivWeathers();

		if (!KyivWeathers.length) {
			return await this.sendError(chatId);
		}

		return await TelegramBot.sendMessage(
			chatId!,
			BotController.weathersToString("Київ", KyivWeathers),
			{ ...this.setReplyKeyboard(), parse_mode: "Markdown" },
		);
	}

	async onMap(chatId: number) {
		return await TelegramBot.sendMessage(
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

	async onMessage(msg: Message) {
		const {
			text,
			chat: { id: chatId },
		} = msg;

		try {
			switch (text) {
				case "/start":
					return await this.onStart(chatId);
				case "/kyiv":
				case "Шо по погоді в Києві":
					return await this.onKyiv(chatId);
				case "/location":
				case "Погода за мапою":
					return await this.onMap(chatId);
				default:
					return;
			}
		} catch (e) {
			console.log(e);
		}
	}

	async onLocation(msg: Message) {
		const location = msg.location;
		const chatId = msg.chat.id;

		if (!location) {
			return await this.sendError(chatId);
		}

		await this.sendLoading(chatId, {
			reply_markup: {
				remove_keyboard: true,
			},
		});

		const weathers = await WeatherService.getWeathers(
			location.latitude,
			location.longitude,
		);

		if (!weathers.length) {
			return await this.sendError(chatId);
		}

		return await TelegramBot.sendMessage(
			chatId!,
			BotController.weathersToString("", weathers),
			{ ...this.setReplyKeyboard(), parse_mode: "Markdown" },
		);
	}
}

export default new BotController();
