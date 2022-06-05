const { Router } = require('express');
const router = Router();
const UserModel = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post(
  '/register',
  [
    check('email', 'Неверный email').isEmail().exists(),
    check('password', 'Минимальная длина пароля не менее 6 символов').isLength({ min: 6 }).exists(),
  ], //валидация
  async (req, res) => {
    try {
      //1.валидация
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: 'error', errors: errors.array() });
        return;
      }

      //2.читаем поля из запроса
      const { email, password } = req.body;

      //3.проверяем был ли создан до этого
      const user = await UserModel.findOne({ email });

      if (user) {
        res.status(400).json({
          message: 'такой пользователь уже существует',
        });
        return;
      }

      //4.Хешируем пароль
      const hashedPassword = await bcrypt.hash(password, 12);

      const data = {
        email,
        password: hashedPassword,
      };

      //5.Добавляем в базу
      const newUser = await UserModel.create(data);

      res.status(200).json({
        message: 'пользователь создан',
        
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },
);

router.post(
  '/login',
  [
    check('email', 'Неверный email').isEmail().exists(),
    check('password', 'Минимальная длина пароля не менее 6 символов').isLength({ min: 6 }).exists(),
  ], //валидация
  async (req, res) => {
    try {

      //1.валидация
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: 'error', errors: errors.array()});
        return;
      }

      //2.читаем поля из запроса
      const { email, password } = req.body;

      //3.находим пользователя
      const user = await UserModel.findOne({ email });

      if(!user){
        res.status(404).json({
          message: 'не авторизован',
        })
        return;
      }

      //4.совпадает ли пароль из базы данных
      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch){
        res.status(404).send({
          error: 'wrong password',          
        });
        return;
      };

      //5.создаем токен
      const SECRET_KEY='qwerty';

      const token = jwt.sign({userId: user.id}, 
        SECRET_KEY, 
        {expiresIn: '1h'}
      )

      //6.отправляем токен клиенту
      res.status(200).json({
        userId: user.id,
        email: user.email,
        token
      });      
    } catch (err) {
      res.status(500).send(err);
    }
  },
);

module.exports = router;
