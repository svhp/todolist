const {Sequelize, Model, DataTypes} = require('sequelize');

const sequelize = new Sequelize('task_manager', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

const model = sequelize.define('task_test', {
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    userid: {
        type: DataTypes.BIGINT,        
    },
    content: { 
        type: DataTypes.TEXT,
        allowNull: false, 
        validate: {
            notEmpty: true
        }
    },
    completed: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deadline: DataTypes.DATE

});

try {
    model.sync();
} catch (error) {
    console.log(error);
}

module.exports = model;