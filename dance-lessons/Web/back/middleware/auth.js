module.exports = function (req, res, next) {
  if (!req.session.isAuthanticated) {
    return res.redirect('/auth/login');
  }
  next();
};
