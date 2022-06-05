const { body, validationResult } = require('express-validator');

exports.registerValidators = [
  body('email').isEmail().withMessage('Введите корректный email'),
  body('password', 'Пароль должен быть минимум 4 символа').isLength({ min: 4 }).isAlphanumeric(),
  body('name').isLength({ min: 4 }).withMessage('Не менее 4 символов'),
  body('confirm', 'Пароль должен быть минимум 4 символа')
    .isLength({ min: 4 })
    .isAlphanumeric()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Пароли должны совпадать');
      }
      return true;
    }),
];

exports.loginValidators = [
  body('email').isEmail().withMessage('Введите корректный email'),
  body('password', 'Пароль должен быть минимум 4 символа').isLength({ min: 4 }).isAlphanumeric(),
];

exports.resetValidators = [body('email').isEmail().withMessage('Введите корректный email')];

exports.resetPasswordValidators = [
  body('password', 'Пароль должен быть минимум 4 символа').isLength({ min: 4 }).isAlphanumeric(),
];
