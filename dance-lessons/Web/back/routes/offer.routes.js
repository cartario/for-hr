const { Router } = require('express');
const router = Router();
const OfferModel = require('../models/Offers');
const { check, validationResult } = require('express-validator');

router.post('/create', async(req, res)=>{
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    await OfferModel.create(req.body);

    res.status(200).json({
      message: 'created successfull'
    })
  }
  catch(err){
    res.status(500).send(err);
  }
})

router.get('/', async(req, res)=>{
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const offers = await OfferModel.find({});

    res.status(200).send({offers})
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

    const offer = await OfferModel.findById(req.params.id);
    res.status(200).send({offer});
  }
  catch(err){
    res.status(500).send(err);
  }
})

module.exports = router;
