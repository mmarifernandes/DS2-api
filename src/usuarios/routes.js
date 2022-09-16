const { Router } = require('express');
const { isAuth } = require('../middlewares/isAuth');
const router = Router();

const UsuariosController = require('./controller');
const controller = new UsuariosController();

router.post('/', (req, res) => controller.create(req, res));
router.post('/auth', (req, res) => controller.auth(req, res));
router.get('/list', (req, res) => controller.list(req, res));
router.get('/profile', isAuth, (req, res) => controller.profile(req, res));

module.exports = router;