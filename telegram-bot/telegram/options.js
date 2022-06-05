const { DAYS_OF_WEEK } = require('../const');
const { getRandomSmile } = require('../utils');

const daysMarkup = DAYS_OF_WEEK.map((day, i) => ({
  text: day,
  callback_data: `day:${i + 1}`,
}));

const daysOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [daysMarkup.slice(0, 2), daysMarkup.slice(2, 4), daysMarkup.slice(4)],
  }),
};

const getHoursOptions = (day, availableHours = []) => {
  const hoursMarkup = availableHours.map((each) => {
    return {
      text: each,
      callback_data: `hour_${day}_${each}`,
    };
  });

  let keyboard = [hoursMarkup];

  if (availableHours.length > 3) {
    keyboard = [hoursMarkup.slice(0, 3), hoursMarkup.slice(3, 5), hoursMarkup.slice(5)];
  }

  return {
    reply_markup: JSON.stringify({
      inline_keyboard: keyboard,
    }),
  };
};

const getStudiosOptions = (studios) => {
  const studioNames = studios.map((each) => {
    return {
      text: each.name + getRandomSmile(),
      callback_data: `studio:${each.name}`,
    };
  });

  let keyboard = [studioNames];

  if (studioNames.length > 3) {
    keyboard = [studioNames.slice(0, 2), studioNames.slice(2, 4), studioNames.slice(4)];
  }

  const options = {
    reply_markup: JSON.stringify({
      inline_keyboard: keyboard,
    }),
  };

  return options;
};

const confirmOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          text: 'Да ✅',
          callback_data: 'confirm:yes',
        },
        {
          text: 'Нет ❌',
          callback_data: 'confirm:no',
        },
      ],
    ],
  }),
};

module.exports = { getHoursOptions, daysOptions, confirmOptions, getStudiosOptions };
