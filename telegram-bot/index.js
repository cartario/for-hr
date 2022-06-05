const bot = require('./telegram');
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const UserModel = require('./models/User');
const StudioModel = require('./models/Studio');

const port = process.env.PORT || 3005;

app.use(express.json());
app.use(express.static('public'));

app.get('/test', async (req, res) => {
  const data = await UserModel.find({});

  res.send({
    test: `test `,
    data,
  });
});

app.get('/reset', async (req, res) => {
  try {
    const userId = req.query.userId;
    const candidate = await UserModel.findOne({ userId });
    await candidate.clearMessages();
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.get('/push', async (req, res) => {
  try {
    const msg = req.query.msg;
    const candidates = await UserModel.find({});

    candidates.forEach((candidate) => {
      if (candidate.userId == 78) {
        //todo убрать моквого юзера
        return;
      }

      const chatId = JSON.parse(JSON.stringify(candidate)).userId; //todo разобрать почему не парсится поле

      if (chatId && msg) {
        bot.sendMessage(chatId, msg);
      } else {
        throw new Error('Empty msg or chatId does not exist');
      }
    });

    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.post('/studio/new', async (req, res) => {
  const timetable = {
    day: req.body.timetable.day,
    start: req.body.timetable.start,
    end: req.body.timetable.end,
  };

  try {
    const studioName = req.body.name;
    const candidate = await StudioModel.findOne({ name: studioName });

    if (!candidate) {
      await StudioModel.create({
        name: req.body.name,
        timetable,
      });
    } else {
      await candidate.updateStudio(timetable);
    }

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
});

const start = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(process.env.MONGO_URI, options);

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

start();
