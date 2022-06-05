const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const bot = new TelegramBot(process.env.TELEGRAM_API_KEY, { polling: true });
const UserModel = require('./models/User');
const StudioModel = require('./models/Studio');
const {
  getHoursOptions,
  daysOptions,
  confirmOptions,
  getStudiosOptions,
} = require('./telegram/options');
const commands = require('./telegram/commands');
const { convertHoursToNumber, getSortedHours, getRangeHours, getRandomSmile } = require('./utils');
const { DAYS_OF_WEEK } = require('./const');

const addMessageToDB = async (id, msg) => {
  const candidate = await UserModel.findOne({
    userId: id,
  });

  if (!candidate) {
    await UserModel.create({
      userId: id,
      messages: [msg],
    });
  }

  await candidate.addMessage(msg);
};

const addToStateDB = async (id, msg) => {
  const candidate = await UserModel.findOne({
    userId: id,
  });

  if (!candidate) {
    await UserModel.create({
      userId: id,
      state: msg,
    });
  }

  await candidate.addToState(msg);
};

const clearStateByUserId = async (userIdFrom) => {
  const candidate = await UserModel.findOne({ userId: userIdFrom });
  await candidate.clearState();
};

const getStudios = async (day, hour) => {
  try {
    const studios = await StudioModel.find({
      'timetable.day': day,
    });

    const studiosFilteredByHour = studios.filter((studio) => {
      for (let i = 0; i < studio.timetable.length; i++) {
        const each = studio.timetable[i];

        const hasHour =
          convertHoursToNumber(each.start) <= convertHoursToNumber(hour) &&
          convertHoursToNumber(each.end) >= convertHoursToNumber(hour);

        if (each.day == day) {
          return hasHour;
        }
      }
    });

    return studiosFilteredByHour;
  } catch (e) {
    console.error(e);
  }
};

const getAvailableHoursByDay = async (day) => {
  const studios = await StudioModel.find({
    'timetable.day': day,
  });

  let allHours = [];

  studios.forEach((studio) => {
    studio.timetable.forEach((each) => {
      if (each.day == day) {
        getRangeHours(each.start, each.end, allHours);
      }
    });
  });

  const hrs = new Set([...getSortedHours(allHours)]);

  return [...hrs];
};

bot.setMyCommands(commands);

bot.onText(/^\/intro$/, async (msg) => {
  const chatId = msg.chat.id;
  const response = 'Пробное занятие. Выбери день';
  await bot.sendMessage(chatId, response, daysOptions);
  await clearStateByUserId(msg.from.id);
});

bot.onText(/^\/timetable$/, async (msg) => {
  const chatId = msg.chat.id;
  const response = 'Расписание. Здесь пока ничего нет, но работа уже идет...';
  await bot.sendMessage(chatId, response);
});

bot.onText(/^\/studios$/, async (msg) => {
  const chatId = msg.chat.id;
  const response = 'Студии. Здесь пока ничего нет, но работа уже идет...';
  await bot.sendMessage(chatId, response);
});

bot.onText(/^\/profile$/, async (msg) => {
  const chatId = msg.chat.id;
  const response = 'Личный кабинет. Здесь пока ничего нет, но работа уже идет...';
  await bot.sendMessage(chatId, response);
});

//CALLBACK_QUERIES
bot.on('callback_query', async (msg) => {
  const chatId = msg.message.chat.id;
  const userIdFrom = msg.from.id;

  if (/^day:/.test(msg.data)) {
    const day = msg.data.split(':')[1];
    await addToStateDB(userIdFrom, { day });
    const availableHours = await getAvailableHoursByDay(day);

    await bot.sendMessage(
      chatId,
      availableHours.length
        ? `[${DAYS_OF_WEEK[day - 1]}]. Выбери удобное время:`
        : 'Нет доступных студий в этот день',
      availableHours.length ? getHoursOptions(day, availableHours) : undefined,
    );
  }

  if (/^hour/.test(msg.data)) {
    const day = msg.data.split('_')[1];
    const hour = msg.data.split('_')[2];

    await addToStateDB(userIdFrom, { hour });
    const studios = await getStudios(day, hour);

    await bot.sendMessage(
      chatId,
      studios.length
        ? `[${DAYS_OF_WEEK[day - 1]}-${hour}]Доступные студии:`
        : 'Нет доступных студий',
      studios.length ? getStudiosOptions(studios) : undefined,
    );
  }

  if (/^studio:/.test(msg.data)) {
    const studio = msg.data.split(':')[1];
    await addToStateDB(userIdFrom, { studio });
    //todo find studio and send reply with photo and description
    await bot.sendMessage(
      chatId,
      `[${studio}] Хороший выбор. Запишемся на пробное?`,
      confirmOptions,
    );
  }

  if (/^confirm:/.test(msg.data)) {
    const { state } = await UserModel.findOne({ userId: userIdFrom });
    const confirm = msg.data.split(':')[1];
    const isConfirmed = confirm === 'yes';
    await addToStateDB(userIdFrom, { confirm: isConfirmed });

    if (!state.studio) {
      await bot.sendMessage(chatId, isConfirmed ? `Уже записали)` : `Подберем что-нибудь еще?`);
      return;
    }

    if (isConfirmed) {
      await bot.sendMessage(chatId, `⭐Вы записаны на ${state.studio}😘`);

      const checkedStudio = `Новая запись в студию ${state.studio}`;
      const checkedDayTime = `Выбран день ${DAYS_OF_WEEK[state.day - 1]}, время-${state.hour}`;
      const userInfo = `[firstName: ${msg.from.first_name},lastName: ${msg.from.last_name}]`;
      const metaInfo = `Date-${new Date()}`;
      const confirmedMsg = `${checkedStudio}. ${checkedDayTime}. ${userInfo}. ${metaInfo}`;

      await addMessageToDB(userIdFrom, confirmedMsg);
      await clearStateByUserId(userIdFrom);
    } else {
      await bot.sendMessage(chatId, 'Будем скучать😭');
    }
  }
});

//tutorial
// listener with regExp

// bot.onText(/\/echo (.+)/, async (msg, match) => {
//   const chatId = msg.chat.id;
//   const resp = match[1];
//   await bot.sendMessage(chatId, resp);
// });

// listener with any text
// bot.on('message', async (msg) => {
//   const chatId = msg.chat.id;
//   await bot.sendMessage(chatId, 'Received your message');
// });

module.exports = bot;
