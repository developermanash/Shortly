const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middlewares/auth');

router.get('/', checkAuth, (req, res) => {
  res.render('home');
});

router.get('/signup', (req, res) => {
  return res.render("signup", { error: null });
});

router.get('/login', (req, res) => {
  res.render("login", { error: null });
});

module.exports = router;

