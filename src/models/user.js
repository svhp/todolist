const { Sequelize, Model, DataTypes, INTEGER } = require('sequelize');

const sequelize = new Sequelize('task_manager', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

const user = sequelize.define('user', {
    updatedAt: false,
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    roleID: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }},
    mobile: DataTypes.INTEGER,
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
            },
        updatedAt: DataTypes.DATE,
        token: DataTypes.STRING,
});

try {
    user.sync();
} catch (error) {
    console.log(error);
}

module.exports = user;