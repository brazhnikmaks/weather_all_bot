import { Handler, HandlerEvent } from "@netlify/functions";
import { Message } from "node-telegram-bot-api";
import botController from "../../controllers/bot-controller";

const handler: Handler = async (event: HandlerEvent) => {
	const { message } = JSON.parse(event.body!);
	await botController.onMessage(message as Message);
	console.log("message sended");
	return { statusCode: 200 };
	``;
};

export { handler };
