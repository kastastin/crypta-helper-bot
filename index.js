const TelegramApi = require('node-telegram-bot-api');


const token = '5028198700:AAH0Syuh-EE1o-O0oLF6HjxMKM8re2nY7u4',
      bot = new TelegramApi(token, { polling: true });


const launchBot = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Open menu' },
        { command: '/info', description: 'Read info' }
    ]);

    bot.on('message', msg => {
        const text = msg.text,
              chatId = msg.chat.id,
              messageId = msg.message_id;

        bot.deleteMessage(chatId, messageId);

        if (text === '/start') {
            bot.deleteMessage(chatId, messageId - 1);
            return bot.sendMessage(chatId, `Hi. Read info before using this bot! PLEASE.`, {
                'reply_markup': {
                    'keyboard': [
                        ['add new project'],
                        ['show active projects'],
                        ['show all projects'], 
                        ['info']
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            });      
        }

        if (text === 'info') {
            bot.deleteMessage(chatId, messageId - 1);
            return bot.sendMessage(chatId, `Тут будет инструкция`);
        }

        return bot.sendMessage(chatId, 'wrong command');
    });
};

launchBot();