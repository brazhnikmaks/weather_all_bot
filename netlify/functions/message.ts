import { Handler, HandlerEvent } from "@netlify/functions";
import { Message } from "node-telegram-bot-api";
import botController from "../../controllers/bot-controller";

const handler: Handler = async (event: HandlerEvent) => {
	console.log(event.body);
	const message = JSON.parse(event.body!) as Message;
	await botController.onMessage(message);
	return { statusCode: 200 };
};

export { handler };
