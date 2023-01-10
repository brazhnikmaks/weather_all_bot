import { Handler, HandlerEvent } from "@netlify/functions";
import { Message } from "node-telegram-bot-api";
import botController from "../../controllers/bot-controller";

const handler: Handler = async (event: HandlerEvent) => {
	const message = JSON.parse(event.body!).message as Message;
	if (message.location) {
		await botController.onLocation(message);
	} else {
		await botController.onMessage(message);
	}
	console.log(
		JSON.stringify({
			username: message.from?.username,
			first_name: message.from?.first_name,
			last_name: message.from?.last_name,
			text: message.text,
		}),
	);
	return { statusCode: 200 };
};

export { handler };
