const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController')


router.get('/', auth, (req, res) => {

    req.user.admin ? res.send('Esse dado só deve ser visto pelo administrador!') : res.status(401).send('Not Admin: Acess Denied!')

})


module.exports = router
