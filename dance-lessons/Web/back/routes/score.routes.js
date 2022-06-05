const { Router } = require('express');
const router = Router();
const ScoreModel = require('../models/Score');
const { check, validationResult } = require('express-validator');

router.post('/create', async(req, res)=>{ //TODO: добавить проверку авторизован ли пользователь
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const lessonId = req.body.lessonId;

    await ScoreModel.create({
      lessonId, 
      score: 0
    });

    res.status(200).json({
      message: 'created successfully'
    })
  }
  catch(err){
    res.status(500).send(err);
  }
});

router.delete('/:lessonId', async(req, res)=>{
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const lessonId = req.params.lessonId;

    const score = await ScoreModel.findOneAndRemove({lessonId});   

    res.status(200).json({
      message: 'deleted succesfull'
    })
  }
  catch(err){
    res.status(500).send(err);
  }
});

router.get('/', async(req, res)=>{
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const scores = await ScoreModel.find({});

    res.status(200).send({scores});
  }
  catch(err){
    res.status(500).send(err);
  }
});

router.patch('/:lessonId', async(req, res)=>{ //TODO: добавить проверку авторизован ли пользователь
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const lessonId = req.params.lessonId;   

    const score = await ScoreModel.find({lessonId});
    const id = score[0].id;   

    const score2  = await ScoreModel.findById(id);    

    score2.score = req.body.score;
    await score2.save();

    res.status(200).json({
      message: 'updated successfull'
    })
  }
  catch(err){
    res.status(500).send(err);
  }
});

module.exports = router;
