import { Handler, HandlerEvent } from "@netlify/functions";
import { Message } from "node-telegram-bot-api";
import BotController from "../../controllers/bot-controller";

const handler: Handler = async (event: HandlerEvent) => {
	const message = JSON.parse(event.body!).message as Message;

	console.log(
		JSON.stringify({
			username: message.from?.username,
			first_name: message.from?.first_name,
			last_name: message.from?.last_name,
			...(message.text ? { text: message.text } : {}),
			...(message.location ? { location: message.location } : {}),
		}),
	);

	if (message.location) {
		await BotController.onLocation.bind(BotController)(message);
	} else {
		await BotController.onMessage.bind(BotController)(message);
	}
	return { statusCode: 200 };
};

export { handler };
