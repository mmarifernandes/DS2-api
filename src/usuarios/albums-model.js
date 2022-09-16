const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');
const { Album } = require('../albums/model');
const { Usuario } = require('./model');

class Resposta extends Model {}
    
Resposta.init({
    id_exercicio: DataTypes.STRING,
    alternativa: DataTypes.STRING
}, { 
    sequelize: sequelizeCon, 
    schema: 'b3',
    modelName: 'resposta'
});

Resposta.belongsTo(Usuario);
Resposta.belongsTo(Album, {
    foreignKey: 'id_exercicio'
});

Usuario.hasMany(Resposta);
Album.hasMany(Resposta, 
    {
        foreignKey: 'id_exercicio'
    });

sequelizeCon.sync();

module.exports = { Resposta };