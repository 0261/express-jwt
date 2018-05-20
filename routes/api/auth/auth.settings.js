const router = require('express').Router();
const fn = require('./auth.functions');
const auth = require('../../../middlewares/isAuthenticate');

// # POST /api/auth/signup
router.post('/signup', auth, fn.signup);
// # POST /api/auth/signin
router.post('/signin',fn.signin);


module.exports = router;