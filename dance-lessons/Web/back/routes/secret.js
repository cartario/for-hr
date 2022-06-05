const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  res.send({
    secretAccess: true,
  });

  console.log('secret');
});

module.exports = router;
