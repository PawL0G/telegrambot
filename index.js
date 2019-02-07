const TelegramBot = require('node-telegram-bot-api')

const TOKEN = '757109302:AAH8fJyA4MBNetHMP2nHVKGGgEzPwxmUrOA'

const bot = new TelegramBot(TOKEN, {polling: true})


  require('http').createServer().listen(process.env.PORT || 5000).on('request', function(req, res){
    res.end('')
  })﻿

  bot.on('message', msg => {
    bot.sendMessage(msg.chat.id, `Hello, glad to see you on KAC Group, ${msg.from.first_name}. Type "/info" to see information about company`)

  });

  bot.onText('/info', msg => {
    const { chat: { id } } = msg
    bot.sendMessage(id, 'KAC Group bla bla bla')

})