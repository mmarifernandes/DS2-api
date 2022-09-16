const { Album } = require('./model');
const Sequelize = require ('sequelize');
const { MusicasAlbum } = require('../musicaAlbum/musicasalbum-model');
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
    async savemusicaalbum(musicaalbum) {
        await MusicasAlbum.create(musicaalbum);
    }

    // async random() {
    //     const ex = await Album.findOne({
    //         order: 
    //             Sequelize.literal('random()')
    //     })
    //     return ex;
    // }

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
            as: 'Musicas',

        }]
        })
        return listagem;
    }
}

module.exports = AlbumRepository;