const express = require('express');
const app = express();
const Album = require('./albums/model.js')
const Musica = require('./albums/musicas-model.js')

const sequelizeCon = require('sequelize')

app.use(express.json());


app.get('/', (req, res) => {
    return res.json({
        system: {
            nome: "AlbumLookUp",
            version: '0.0.1-SNAPSHOT'
        },
    });
});


const albumsRouter = require('./albums/routes');
app.use('/albums', albumsRouter);

const usuariosRouter = require('./usuarios/routes');
app.use('/usuarios', usuariosRouter);

app.listen(3000, () => console.log("Listening at 3000"));