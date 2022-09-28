
const express = require('express');
const app = express();
const Album = require('./albums/model.js')
const Musica = require('./albums/musicas-model.js')
// const MusicasAlbum = require('./musicaAlbum/musicasalbum-model.js')

const sequelizeCon = require('sequelize')
// INCLUI UM MIDDLEWARE PARA FAZER UM PARSER
// DAS REQUISICOES COM JSON NO SEU BODY
app.use(express.json());


app.get('/', (req, res) => {
    return res.json({
        system: {
            nome: "AlbumLookUp",
            version: '0.0.1-SNAPSHOT'
        },
    });
});

app.post('/users', (req, res) => {
    console.log("No server...");
    console.log({ body: req.body })
    const newUser = {
        timestamp: new Date(),
        ...req.body, // DESESTRUTURAÇÃO - CONSISTE EM DESMONTAR O MEU OBJ
    };
    users.push(newUser);
    return res.json(newUser)
});

// app.put('/users/:name/hobbies', (req, res) => {
//     const { name } = req.params;    // busca o parametro name da URL
//     const user = users.find(u => u.name == name);
//     console.log({
//         msg: "achei",
//         quem: user
//     });
    
//     const { hobbies } = req.body;
//     user.hobbies = hobbies;

//     return res.json(user);
// });


app.delete('/users/:name', (req, res) => {
    const { name } = req.params;
    users = users.filter(u => u.name !== name);
    return res.status(201);
})

const albumsRouter = require('./albums/routes');
app.use('/albums', albumsRouter);

const usuariosRouter = require('./usuarios/routes');
app.use('/usuarios', usuariosRouter);

app.listen(3000, () => console.log("Listening at 3000"));