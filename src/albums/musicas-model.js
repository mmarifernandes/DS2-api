const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');
const { Album } = require('../albums/model')
const { Usuario } = require('../usuarios/model');

class Musica extends Model { }

Musica.init({
    id_musica: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    id_album: DataTypes.STRING,
    nome: DataTypes.STRING,
    capa: DataTypes.STRING,
    duracao: DataTypes.STRING
}, {
    sequelize: sequelizeCon,
    schema: 'public',
    modelName: 'musicas'
});

Album.hasMany(Musica, {
    foreignKey: 'id_album',
    onDelete: 'cascade',
});

Usuario.hasMany(Album, {
    onDelete: 'cascade',

});
Album.belongsTo(Usuario, {
    foreignKey: 'usuarioEmail'
});
Musica.belongsTo(Album, {
    foreignKey: 'id_album',
});


sequelizeCon.sync();
module.exports = { Musica };