const { Album } = require('./model');
const Sequelize = require ('sequelize');

class AlbumRepository {
    constructor() {
    }

    async save(ex) {
        await Album.create(ex);
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

    async list(disciplina) {
        const listagem = await Album.findAll({
            where: { 
                disciplina
            }
        })
        return listagem;
    }
}

module.exports = AlbumRepository;