const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');
const { Album } = require('../albums/model')
const { Usuario } = require('../usuarios/model');

class Musica extends Model {}
    
Musica.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
    id_album: DataTypes.STRING,
    titulo: DataTypes.STRING,
    capa: DataTypes.STRING,
    duracao: DataTypes.STRING
}, { 
    sequelize: sequelizeCon, 
    schema: 'public',
    modelName: 'musicas'
});

Musica.belongsTo(Album, {
    foreignKey: 'id_album',
    as: 'albumid'
});

Usuario.hasMany(Album);
Album.hasMany(Musica, 
    {
        foreignKey: 'id_album',
        as: 'albumid'
    });

    
    sequelizeCon.sync();
    module.exports = { Musica };