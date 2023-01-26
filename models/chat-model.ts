import { Schema, model } from "mongoose";
import { IChat } from "../types/chat";

const ChatSchema = new Schema<IChat>({
	id: { type: Number, unique: true, required: true },
	createdAt: { type: Date, default: Date.now },
	firstName: { type: String },
	lastName: { type: String },
	username: { type: String },
});

export default model<IChat>("Chat", ChatSchema);
