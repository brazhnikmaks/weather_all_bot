import TelegramApi from "node-telegram-bot-api";
import { config } from "dotenv";

config();

const botOptions = { polling: true };

const TelegramBot = new TelegramApi(
	process.env.BOT_TOKEN as string,
	process.env.NODE_ENV === "development" ? botOptions : undefined,
);

export default TelegramBot;
