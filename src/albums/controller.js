const AlbumRepository = require("./repositorio-sql");
const crypto = require("crypto");
const { Album } = require("./model");
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
      titulo: req.body.titulo.toUpperCase(),
    };

    await this.repository.save(album);

    return res.json({
      album,
    });
  }

  async createmusica(req, res) {
    // INPUT
    const id = { id: crypto.randomUUID() };
    const musica = {
      id: id.id,
      ...req.body,
      titulo: req.body.titulo.toUpperCase(),
    };
    const musicaalbum = {
      musicaId: id.id,
      albumId: req.body.id_album,
    };
    await this.repository.savemusica(musica);
    await this.repository.savemusicaalbum(musicaalbum);

    // RESPOSTA
    return res.json({
      musica,
      musicaalbum,
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
    const id = req.query.id;
    const listagem = await this.repository.listId(id);
    if (listagem.length === 0) {
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
    const { id } = req.params;
    const { titulo } = req.body;
    const album = await Album.update(
      {
        ...req.body
      },
      {
        where: {
          id: id,
        },
      }
      );
      const albumnovo = await Album.findOne({
        where: {
          id: id,
        }
      })
    console.log(album);
    return res.json(albumnovo);
  }

    async updatemusica(req, res) {
    const { id } = req.params;
    const { titulo } = req.body;
    const album = await Musica.update(
      {
        ...req.body
      },
      {
        where: {
          id: id,
        },
      }
    );
    console.log(album);
    return res.json(album);
  }
}

module.exports = AlbumController;
