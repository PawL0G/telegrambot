'use strict';

const TelegramBot = require('node-telegram-bot-api'),
  request = require('request'),
  fs = require('fs'),
  token = '757109302:AAH8fJyA4MBNetHMP2nHVKGGgEzPwxmUrOA',
  bot = new TelegramBot(token, {polling:true});

bot.on('message', function (msg) {
  const id = msg.from.id;

  if (msg.text === 'привет') {
    bot.sendMessage(id, 'Приветсвуем на нашем канале')
  }

  if (msg.text === '/info') {
    bot.sendMessage(id, 'Тут вы можете посмотреть информацию')
  }

});
