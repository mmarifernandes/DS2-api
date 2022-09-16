const album = [];

class AlbumRepository {
    constructor() {

    }

    save(ex) {
        album.push(ex);
    }

    random() {
        let randomIdx = Math.floor( Math.random()*album.length);
        return album[randomIdx];
    }

    detail(id) {
        const ex = album.find(e => e.id == id);
        return ex;
    }

    list(disciplina) {
        const lista = album.filter(e => e.disciplina == disciplina);
        return lista;
    }
}

module.exports = AlbumRepository;