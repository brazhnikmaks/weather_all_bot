import TelegramApi from "node-telegram-bot-api";

const bot = new TelegramApi("5955184773:AAHHS6MqzjcVa9NcmClJp-dYsddCXMPapq8", {
	polling: true,
});

export { bot };
