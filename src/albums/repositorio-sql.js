const { Album } = require('./model');
const Sequelize = require('sequelize');
const { Musica } = require('./musicas-model');

class AlbumRepository {
    constructor() {
    }

    async save(album) {
        await Album.create(album);
    }
    async savemusica(musica) {
        await Musica.create(musica);
    }

    async detail(id) {
        const ex = await Album.findByPk(id)
        return ex;
    }

    async list(titulo) {
        const listagem = await Album.findAll({
            where: {
                titulo
            },
            include: [{
                model: Musica,

            }]
        })
        return listagem;
    }

    async listId(id) {
        const listagem = await Album.findAll({
            where: {
                id
            },
            include: [{
                model: Musica,

            }]
        })
        return listagem;
    }

    async listAll() {
        const listagem = await Album.findAll()
        return listagem;
    }
}

module.exports = AlbumRepository;