import {
	Message,
	SendMessageOptions,
	KeyboardButton,
} from "node-telegram-bot-api";
import TelegramBot from "../servises/telefram-service";
import WeatherService from "../servises/weather-service";
import db from "../servises/mongo-service";
import { IWeatherData } from "../types";

class BotController {
	chatAdded: {
		[key: number]: number;
	};

	constructor() {
		this.setCommands();
		this.chatAdded = {};
	}

	async setCommands() {
		await TelegramBot.setMyCommands([
			{ command: "/kyiv", description: "Шо по погоді в Києві" },
			{ command: "/location", description: "Погода за мапою" },
			{ command: "/help", description: "Допомога" },
		]);
	}

	setReplyKeyboard(): SendMessageOptions {
		const keyboard: KeyboardButton[][] = [];

		keyboard.push([
			{
				text: "Шо по погоді в Києві",
			},
			{
				text: "Погода за мапою",
				request_location: true,
			},
		]);

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

	async onHelp(chatId: number) {
		return await TelegramBot.sendMessage(
			chatId,
			`Тут можна дізнатись про погоду з різних джерел та порівняти її.\n\n/kyiv - погода в Києві.\n\n/location - погода вашого місцезнаходження або у точці на мапі (потрібно вислати точку на мапі з меню "скріпки").`,
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
					await this.onStart(chatId);
					break;
				case "/kyiv":
				case "Шо по погоді в Києві":
					await this.onKyiv(chatId);
					break;
				case "/location":
					await this.onMap(chatId);
					break;
				default:
					await this.onHelp(chatId);
					break;
			}

			await this.addUser(msg);
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

		await TelegramBot.sendMessage(
			chatId!,
			BotController.weathersToString("", weathers),
			{ ...this.setReplyKeyboard(), parse_mode: "Markdown" },
		);

		await this.addUser(msg);
	}

	async addUser(msg: Message) {
		const {
			chat: { id: chatId },
			from,
		} = msg;

		if (this.chatAdded[chatId]) {
			return;
		}

		try {
			await db.connect();
			console.log("connect");
			try {
				await db.getChat(chatId);
				console.log("get");
			} catch (e) {
				await db.addChat(chatId, from);
				console.log("add");
			} finally {
				this.chatAdded[chatId] = chatId;
			}
		} catch (e) {}
	}
}

export default new BotController();
