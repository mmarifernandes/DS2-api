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

    const album = {
      id: id.id,
      artista: req.body.artista.toUpperCase(),
      titulo: req.body.titulo.toUpperCase(),
      ...req.body,
    };

    await this.repository.save(album);
    let count = {
      total: req.body.musica.length
    };
    for (let i = 0; i < count.total; i++) {
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
    const id = { id: crypto.randomUUID() };
    const musica = {
      id_musica: id.id,
      ...req.body,
      nome: req.body.nome,
    };

    await this.repository.savemusica(musica);
    return res.json({
      musica,
    });
  }

  async listId(req, res) {
    const id = req.params.id;
    const listagem = await this.repository.listId(id);
    console.log(listagem)
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
    console.log(id)
    const albumEcontrado = await Album.findOne({
      where: {
        id
      }
    })
    //verifica se album existe
    if (!albumEcontrado) {
      return res.status(400).json({
        msg: "NOTHING WAS FOUND",
      });
    } else {
      //existe
      const album = await Album.update({
        ...req.body
      }, {
        where: {
          id: id,
        },
      });
      //se existe musica p add
      if (req.body.musica) {
        let count = { total: req.body.musica.length };
        for (let i = 0; i < count.total; i++) {
          const id_musica = { id: req.body.musica[i].id_musica }
          //existe o id da musica?
          const musicaEcontrado = await Musica.findOne({
            where: {
              id_musica: id_musica.id
            }
          })
          console.log(musicaEcontrado)
          //nao
          if (!musicaEcontrado) {
            return res.status(400).json({
              msg: "NOTHING WAS FOUND",
            });
          } else {
            //sim
            const musica = await Musica.update({
              ...req.body.musica[i]
            }, {
              where: {
                id_musica: id_musica.id,
              },
            });

            const albumnovo = await Album.findOne({
              where: {
                id: id,
              }
            })
            return res.json({ albumnovo });
          }
        }
      } else {
        const albumnovo = await Album.findOne({
          where: {
            id: id,
          }
        })
        return res.json({ albumnovo });

      }
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const albumEcontrado = await Album.findOne({
      where: {
        id
      }
    })
    if (albumEcontrado) {
      const album = Album.destroy({
        where: {
          id: req.params.id
        }
      })
      return res.json(album);
    } else {
      return res.status(400).json({
        msg: "NOTHING WAS FOUND",
      });
    }
  }

  async deletemusica(req, res) {
    const { id } = req.params;
    const musicaEcontrado = await Musica.findOne({
      where: {
        id_musica: id
      }
    })
    if (musicaEcontrado) {
      const musica = Musica.destroy({
        where: {
          id_musica: req.params.id
        }
      })
      return res.json(musica);
    } else {
      return res.status(400).json({
        msg: "NOTHING WAS FOUND",
      });
    }
  }

}

module.exports = AlbumController;