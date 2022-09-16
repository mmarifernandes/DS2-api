const { Sequelize } = require('sequelize');

const sequelizeCon = new Sequelize('postgres://yhxjytigcislsi:837b5c2d8d0203bc55ea3fb347699cbe87fc291dafd60dbed7b1108421a33acd@ec2-34-194-73-236.compute-1.amazonaws.com:5432/dcmpjvjc8sfr4f', {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

module.exports = { sequelizeCon };