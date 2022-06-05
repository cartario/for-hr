require('dotenv').config();

module.exports = function (email, token) {
  return {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: 'Восстановление пароля',
    html: `
      <p>Сброс пароля для - ${email}</p>
      <hr/>
      <p>
        Чтобы сбросить пароль, пожалуйста 
        <a href="${process.env.BASE_URL}/auth/password/${token}">перейдите по ссылке </a>
      </p>      
    `,
  };
};
