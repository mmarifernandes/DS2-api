const { Usuario } = require('./model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsuariosController {

    constructor() {

    }

    async create(req, res) {
        const userBody = req.body;
        const { email, nome } = req.body;
        const senha = bcrypt.hashSync(userBody.senha, 10);
        const user = await Usuario.create({
            email, senha, nome
        });

        return res.status(201).json(user);

    }

    async auth(req, res) {
        const { email, senha } = req.body;
        const usuarioEcontrado = await Usuario.findOne({
            where: {
                email
            }
        })
        if (usuarioEcontrado) {
            const confere = bcrypt.compareSync(senha, usuarioEcontrado.senha);
            if (confere) {
                const user = usuarioEcontrado
                const meuJwt = jwt.sign(user.dataValues, 'MEU SEGREDO')
                return res.json(meuJwt);
            } else {
                return res.status(400).json({ msg: "USER AND PASS NOT MATCH" });

            }
        }
        else {
            return res.status(400).json({ msg: "USER NOT FOUND" });
        }
    }

    async list(req, res) {
        const users = await Usuario.findAndCountAll();
        res.json(users);
    }

    async profile(req, res) {
        res.json({ user: req.user });
    }
}


module.exports = UsuariosController;