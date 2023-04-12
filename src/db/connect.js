const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task_manager', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

const connection = () => {
    return sequelize.authenticate();
};

module.exports = connection;
