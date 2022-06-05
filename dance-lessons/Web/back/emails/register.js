require('dotenv').config();

module.exports = function (email) {
  return {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: 'Регистрация прошла успешно',
    html: `
      <p>Поздравляем! Ваш email - ${email} зарегистрирован</p>
      <hr/>
      <a href="${process.env.BASE_URL}">Главная Kruti-Verti</a>
    `,
  };
};
