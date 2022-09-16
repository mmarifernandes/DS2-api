const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');

class Album extends Model {}
    
Album.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    titulo: DataTypes.STRING,
    data: DataTypes.STRING,
    artista: DataTypes.STRING,
    user: DataTypes.STRING,
    musicas: DataTypes.JSON,
}, { 
    sequelize: sequelizeCon, 
    schema: 'public',
    modelName: 'album'
});


// sequelizeCon.sync()
   
module.exports = { Album };