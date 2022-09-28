const { Album } = require('./model');
const Sequelize = require ('sequelize');
// const { MusicasAlbum } = require('../musicaAlbum/musicasalbum-model');
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


    // async random() {
    //     const ex = await Album.findOne({
    //         order: 
    //             Sequelize.literal('random()')
    //     })
    //     return ex;
    // }
    // async update(id){
        
    //      const album = await Album.update({
    //         ...req.body
    //      }, {
    //          where: {
    //              id: id,
    //          },
    //      });
    //           return album;

    //      console.log(album);
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