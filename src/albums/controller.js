const AlbumRepository = require("./repositorio-sql");
const crypto = require("crypto");
const { Album } = require("./model");
const { Musica } = require("./musicas-model");
class AlbumController {
  constructor() {
    this.repository = new AlbumRepository();
  }

  async create(req, res) {
    const id = {
      id: crypto.randomUUID()
    };

    // console.log("CRIANDO UMA NOVA QUESTAO");
    const album = {
      id: id.id,
      artista: req.body.artista.toUpperCase(),
      titulo: req.body.titulo.toUpperCase(),
      ...req.body,
    };

    await this.repository.save(album);
    // console.log(req.body.musica.length)
    let count = {
      total: req.body.musica.length
    };
    for (let i = 0; i < count.total; i++) {
      // console.log(i)
      const idmusica = {
        id: crypto.randomUUID()
      };
      const musica = {
        id_musica: idmusica.id,
        id_album: id.id,
        ...req.body.musica[i],
      };
      await this.repository.savemusica(musica);
    }


    return res.json({
      album
    });
  }

  async createmusica(req, res) {
    // INPUT
    const id = { id: crypto.randomUUID() };
    const musica = {
      id_musica: id.id,
      ...req.body,
      nome: req.body.titulo.toUpperCase(),
    };

    await this.repository.savemusica(musica);

    // RESPOSTA
    return res.json({
      musica,
    });
  }

  async list(req, res) {
    const titulo = req.query.titulo.toUpperCase();
    const listagem = await this.repository.list(titulo);
    if (listagem.length === 0) {
      return res.status(400).json({
        msg: "NOTHING WAS FOUND",
      });
    } else {
      return res.json(listagem);
    }
  }
  async listId(req, res) {
    const id = req.params.id;
    // console.log(req.params)
    const listagem = await this.repository.listId(id);
    if (!listagem) {
      return res.status(400).json({
        msg: "NOTHING WAS FOUND",
      });
    } else {
      return res.json(listagem);
    }
  }

  async listAll(req, res) {
    const listagem = await this.repository.listAll();
    if (listagem.length === 0) {
      return res.status(400).json({
        msg: "NOTHING WAS FOUND",
      });
    } else {
      return res.json(listagem);
    }
  }

  async update(req, res) {
       let count = {
      total: req.body.musica.length
    };
    const {id} = req.params;
    console.log(id)
    
    const album = await Album.update({
      ...req.body
    }, {
      where: {
        id: id,
      },
    });
    for (let i = 0; i < count.total; i++) {
      const id_musica = { id: req.body.musica[i].id_musica}

       const musica = await Musica.update({
         ...req.body.musica[i]
       }, {
         where: {
           id_musica: id_musica.id,
         },
       });
      }
    const albumnovo = await Album.findOne({
      where: {
        id: id,
      }
    })
    // console.log(id_musica);
    return res.json({albumnovo});
  }

  async delete(req, res) {
        const {id} = req.params;
    const album = Album.destroy({
      where:{ 
        id: req.params.id
   }
  })
        return res.json(album);

  // , 
  // (err) => {
  //    //Retornar erro quando não conseguir apagar no banco de dados
  //    if (err) return res.status(400).json({
  //      error: true,
  //      message: "Error: Não foi apagado com sucesso!"
  //    });

  //    //Retornar mensagem de sucesso quando excluir o registro com sucesso no banco de dados
  //    return res.json({
  //      error: false,
  //      message: "Apagado com sucesso!"
  //    });
  //  });

  }
}

module.exports = AlbumController;