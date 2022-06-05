const { Router } = require('express');
const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
const router = Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const keys = require('../keys');
const regEmail = require('../emails/register');
const resetEmail = require('../emails/reset');
const { validationResult } = require('express-validator');
const {
  registerValidators,
  loginValidators,
  resetValidators,
  resetPasswordValidators,
} = require('../utils/validators');

const transporter = nodemailer.createTransport(
  sendgrid({
    auth: {
      api_key: keys.SENDGRID_API_KEY,
    },
  }),
);

router.get('/', async (req, res) => {
  res.send({
    isAuth: req.session.isAuthanticated,
    csrfToken: req.csrfToken(),
    errors: req.flash('authError'),
    info: req.flash('authInfo'),
  });
});

router.post('/login', loginValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('authError', errors.array()[0].msg);
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      req.flash('authError', 'Пользователь не найден!');
      // return res.status(401).send({
      //   errors: req.flash('authError'),
      // });
      return res.redirect('/auth/login#login');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      req.flash('authError', 'Неверный пароль!');
      // return res.status(401).send({
      //   errors: req.flash('authError'),
      // });
      return res.redirect('/auth/login#login');
    }

    req.session.user = user;
    req.session.isAuthanticated = true;
    req.session.save((err) => {
      if (err) {
        throw err;
      }
      console.log('user authorized successfully');
      res.redirect('/');
    });
  } catch (err) {
    console.log(err);
  }
});

router.post('/register', registerValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('authError', errors.array()[0].msg);
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { email, password, name } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      req.flash('authError', 'Такой пользователь существует!');
      return res.redirect('/auth/login#register');
    } else {
      const hashPassword = await bcrypt.hash(password, 10);

      const user = new User({
        email,
        name,
        password: hashPassword,
        // cart: { items: [] },
      });
      await user.save();
      req.flash('authInfo', 'Пользователь успешно сохранен!');
      res.redirect('/auth/login#login');

      await transporter.sendMail(regEmail(email), function (transErr, transRes) {
        if (transErr) {
          console.log(transErr);
        }
        console.log(transRes);
      });
    }
  } catch (e) {
    console.log(e);
  }
});

router.get('/logout', async (req, res) => {
  // req.session.destroy(() => {
  //   res.redirect('/auth/login#login');
  // });
  req.session.destroy(() => {
    res.send({
      logoutMsg: 'success',
    });
  });
});

router.post('/reset', resetValidators, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('authError', errors.array()[0].msg);
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        req.flash('authError', 'Что-то пошло не так');
        return res.redirect('/auth/login');
      }

      const candidate = await User.findOne({ email: req.body.email });

      if (!candidate) {
        req.flash('authError', 'Такого пользователя нет');
        return res.redirect('/auth/reset');
      }

      const token = buffer.toString('hex');
      candidate.resetToken = token;
      candidate.resetTokenExp = Date.now() + 60 * 60 * 1000;

      await candidate.save();

      await transporter.sendMail(resetEmail(candidate.email, token), function (transErr, transRes) {
        if (transErr) {
          console.log(transErr);
        }
        console.log(transRes);
        //письмо успешно отправлено
        req.flash('authInfo', 'Письмо с восстановлением пароля успешно отправлено на почту');
        res.redirect('/auth/login');
      });
    });
  } catch (e) {
    console.log(e);
  }
});

router.get('/password/:token', async (req, res) => {
  const token = req.params.token;

  if (!token) {
    req.flash('authError', 'Неправильный токен');
    return res.redirect('/auth/login');
  }

  try {
    const candidate = await User.findOne({
      resetToken: token,
      resetTokenExp: { $gt: Date.now() },
    });

    if (!candidate) {
      req.flash('authError', 'Неправильный токен');
      return res.redirect('/auth/login');
    }

    res.send({
      userId: candidate._id.toString(),
    });

    // res.render('auth/password', {
    //   title: 'Новый пароль',
    //   userId: candidate._id.toString(),
    //   token,
    //   // error: req.flash('error'),
    // });
  } catch (e) {
    console.log(e);
  }
});

router.post('/password', resetPasswordValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('authError', errors.array()[0].msg);
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({
      _id: req.body.userId,
      resetToken: req.body.token,
      resetTokenExp: { $gt: Date.now() },
    });

    if (user) {
      const newHashPassword = await bcrypt.hash(req.body.password, 10);
      user.password = newHashPassword;
      user.resetToken = undefined;
      user.resetTokenExp = undefined;
      await user.save();
      req.flash('authInfo', 'Пароль успешно обновлен!');

      res.redirect('/auth/login');
    } else {
      req.flash('authError', 'Время жизни токена истекло');
      res.redirect('/auth/login');
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
