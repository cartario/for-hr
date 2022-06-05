const { Router } = require('express');
const router = Router();
const MainModel = require('../models/Main');
const { check, validationResult } = require('express-validator');

router.get('/feedbacks', async (req, res) => {
  //TODO: добавить проверку авторизован ли пользователь
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const feedbacks = await MainModel.find({});

    res.status(200).send({ feedbacks });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/score', async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const score = await MainModel.findById('5ffbd3429d8fc612d08f8a24');

    // if (!eventId) {
    //   res.status(400).json({
    //     message: 'событие не найдено',
    //   });
    // }

    res.status(200).json(score.score);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch('/score', async (req, res) => {
  try {
    const score = await MainModel.findById('5ffbd3429d8fc612d08f8a24');
    score.score = req.body.score;

    await score.save();

    // if (!eventId) {
    //   res.status(400).json({
    //     message: 'событие не найдено',
    //   });
    // }

    res.status(200).json(score.score);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/create', async (req, res) => {
  const obj = req.body;
  try {
    const test = await MainModel.create(obj);

    // if (!eventId) {
    //   res.status(400).json({
    //     message: 'событие не найдено',
    //   });
    // }

    res.status(200).json(test);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
