import {Sequelize} from "sequelize";

const db = new Sequelize('node', 'root', 'tito21maber11', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
});

export default db;