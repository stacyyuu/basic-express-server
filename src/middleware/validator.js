module.exports = (req, res, next) => {
  if (req.query.name) {
    req.name = req.query.name;
    next();
  } else {
    next('Unable to validate. No name given.');
  }
};
