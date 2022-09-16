const { Router } = require('express');
const router = Router();

const AlbumController = require('./controller');
const controller = new AlbumController();

router.post('/', (req, res) => controller.create(req, res));
router.post('/musica', (req, res) => controller.createmusica(req, res));
router.get('/random', (req, res) => controller.random(req, res));
router.get('/list', (req, res) => controller.list(req, res));
router.get('/:id', (req, res) => controller.detail(req, res));

module.exports = router;