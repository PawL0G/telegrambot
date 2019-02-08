'use strict';

import Koa from 'koa'
import config from 'config'
import Router from 'koa-router'



const app = new Koa();
const router = new Router();
router.post('/bot', ctx => {
  console.log(ctx)
  ctx.status = 200
});

app.use(router.routes())

const port = config.get('port')
app.listen(port, () => {
  console.log('Listening on ${port}')
});

require('http').createServer().listen(process.env.PORT || 3000).on('request', function(request, res){
  res.end('')
  logger.request(req,res,error);
  print(logger);
});

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
  } else {
    bot.sendMessage(id, "echo")
  }

})

bot.on('message', msg => {
  const {chat: { id }} = msg
  bot.sendMessage(id, 'Привет')
})

bot.onText(/\/курс/, (msg, [source, match]) => {

  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Выбирите валюту', {

    reply_markup: {
      inline_keyboard: [
        [
          {
          text: 'EUR',
            callback_data: 'EUR'
          },
          {
            text: 'USD',
            callback_data: 'USD'
          },
          {
            text: 'UAH',
            callback_data: 'UAH'
          }
        ]
      ]
    }
  });
});

bot.on('callback_query', query => {
  const id = query.message.chat.id;

  request('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', function(error, response, body){
    const data = JSON.parse(body);
    const result = data.filter(item => item.ccy === query.data)[0];
    let md = `
      *${result.ccy} = > ${result.base_ccy}*
      Buy: _${result.buy}
      Sale: _${result.sale}
      `;
    bot.sendMessage(id,md, {parse_mode: 'Markdown'});
  });
})