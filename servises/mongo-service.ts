import { config } from "dotenv";
import mongoose from "mongoose";
import { User } from "node-telegram-bot-api";
import ChatModel from "../models/chat-model";
import ChatDto from "../dtos/chat-dto";

config();
mongoose.set("strictQuery", false);

class MongoService {
	async connect() {
		try {
			const connect = await mongoose.connect(
				process.env.MONGO_DB_URL as string,
			);
			return connect;
		} catch (err) {
			console.log("Failed to connect to DB", err);
		}
	}

	async getChat(chatId: number) {
		const chat = await ChatModel.findOne({ id: chatId });
		if (!chat) {
			throw new Error("No chat founded");
		}
		return new ChatDto(chat);
	}

	async addChat(chatId: number, from?: User) {
		const chat = await ChatModel.create({
			id: chatId,
			firstName: from?.first_name,
			lastName: from?.last_name,
			username: from?.username,
		});
		return new ChatDto(chat);
	}
}

export default new MongoService();
