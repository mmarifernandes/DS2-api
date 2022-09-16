const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');
const { Album } = require('./model')
const { Musica } = require('../albums/musicas-model.js');

// class MusicasAlbum extends Model {}

const MusicasAlbum = sequelizeCon.define('MusicasAlbum', {}, {
    timestamps: false
});


Musica.belongsToMany(Album, {
   as: 'MusicaAlbum', through: 'MusicasAlbum',
});
Album.belongsToMany(Musica, {
   as: 'Musicas', through: 'MusicasAlbum',
});


    
    // sequelizeCon.sync();
    module.exports = { MusicasAlbum };