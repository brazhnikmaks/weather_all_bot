import TelegramBot from "./servises/telefram-service";
import BotController from "./controllers/bot-controller";

TelegramBot.on("message", BotController.onMessage.bind(BotController));
TelegramBot.on("location", BotController.onLocation.bind(BotController));
