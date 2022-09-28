const { Router } = require('express');
const { isAuth } = require('../middlewares/isAuth');
const router = Router();

const AlbumController = require('./controller');
const controller = new AlbumController();

router.post('/', isAuth, (req, res) => controller.create(req, res));
router.post('/musica', isAuth, (req, res) => controller.createmusica(req, res));
router.put('/update/:id', (req, res) => controller.update(req, res));
router.get('/random', (req, res) => controller.random(req, res));
router.get('/listAll', (req, res) => controller.listAll(req, res));
router.get('/:id', (req, res) => controller.listId(req, res));
router.get('/list', (req, res) => controller.list(req, res));
router.delete('/delete/:id', isAuth, (req, res) => controller.delete(req, res));

module.exports = router;