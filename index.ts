import { bot } from "./servises/telefram-service";
import BotController from "./controllers/bot-controller";

bot.on("message", BotController.onMessage);
bot.on("location", BotController.onLocation);
