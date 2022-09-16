// const AlbumRepositoryMemory = require('./repositorio-memory');
const AlbumRepository = require('./repositorio-sql');
const crypto = require('crypto');

class AlbumController {

    constructor() {
        this.repository = new AlbumRepository();
    }

    async create(req, res) {
        // console.log("CRIANDO UMA NOVA QUESTAO");
        const album = {  
            id: crypto.randomUUID(),
            ...req.body,
            artista: req.body.artista.toUpperCase(),
            titulo: req.body.titulo.toUpperCase()

        };

        await this.repository.save(album);
        
        return res.json({
            album
        });
    }


      async createmusica(req, res) {
        // INPUT
        const id = {id: crypto.randomUUID()}
          const musica = {
            id: id.id,
              ...req.body,
            titulo: req.body.titulo.toUpperCase(),
            
          };
          const musicaalbum = {
            musicaId: id.id,
            albumId: req.body.id_album
          }
        await this.repository.savemusica(musica)
        await this.repository.savemusicaalbum(musicaalbum);

        // RESPOSTA
        return res.json({
            musica, musicaalbum
        });

    }

    // async random(req, res) {
    //     const disciplina = await this.repository.random();
    //     return res.json(disciplina);
    // }

    async list(req, res) {
        const titulo = req.query.titulo.toUpperCase();
        const listagem = await this.repository.list(titulo);
        console.log(listagem)
        return res.json(listagem);
    }

    async detail(req, res) {
        const { id } = req.params;
        const album = await this.repository.detail(id);
        return res.json(album);
    }
}


module.exports = AlbumController;