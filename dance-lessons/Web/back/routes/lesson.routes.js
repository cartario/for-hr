const { Router } = require('express');
const router = Router();
const LessonModel = require('../models/Lesson');
const { check, validationResult } = require('express-validator');

router.get('/', async(req, res)=>{ 
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const lessons = await LessonModel.find({});

    res.status(200).send({lessons})
  }
  catch(err){
    res.status(500).send(err);
  }
});

router.get('/:id', async(req, res)=>{ 
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const lesson = await LessonModel.findById(req.params.id);

    res.status(200).send({lesson})
  }
  catch(err){
    res.status(500).send(err);
  }
});

router.post('/create', async(req, res)=>{
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }    

    const newLesson = await LessonModel.create({...req.body});

    res.status(200).send({
      message: 'created successfully',
      lessonId: newLesson.id
    })
  }
  catch(err){
    res.status(500).send({err});
  }
});

router.delete('/:id', async (req, res)=>{
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const id = req.params.id;
    const lesson = await LessonModel.findById(id);

    if(!lesson){
      res.status(400).json({
        message: 'lesson did not find'
      });
      return;
    }

    await LessonModel.findByIdAndDelete(id);
    res.status(200).json({
      message: 'deleted successfull',
      lessonId: lesson.id
    })

  }
  catch(err){
    res.status(500).send({err});
  }
});

router.patch('/:id', async (req, res)=>{
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const id = req.params.id;    
    const lesson = await LessonModel.findById(id);

    if(!lesson){
      res.status(400).json({
        message: 'lesson did not find'
      });
      return;
    };

    const fields = Object.keys(req.body);

    fields.forEach((field)=>{
      lesson[field] = req.body[field];
    });

    await lesson.save();
    
    res.status(200).json({
      message: 'updated successfull'
    })

  }
  catch(err){
    res.status(500).send({err});
  }
})

module.exports = router;
