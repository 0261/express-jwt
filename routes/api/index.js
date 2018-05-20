const router = require('express').Router();
//required middleware\\
const bodyParser = require('body-parser').json(); // For POST
const models = require('../../models')
const cookieParser = require('cookie-parser'); // Cookies

router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
}); // CORS

router.use(cookieParser()); // Cookies
router.use(bodyParser) // Parsing Post Data


//Sync Database
models.sequelize.sync().then(function () {

}).catch(function (err) {
    console.log(err)
});
////////////////////////

// # Authenticate
const auth = require('./auth/auth.settings');
router.use('/auth', auth);
// ################


// 보안체크하자 
module.exports = router;