const TelegramBot = require('node-telegram-bot-api')

const TOKEN = '757109302:AAH8fJyA4MBNetHMP2nHVKGGgEzPwxmUrOA'

const bot = new TelegramBot(TOKEN, {polling: true})

bot.on('message', msg => {
  bot.sendMessage(msg.chat.id, `Hello, glad to see you on KAC Group, ${msg.from.first_name}"`)
})