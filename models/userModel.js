const { DataTypes } = require("sequelize");
const {createDB} = require("../config/db");

const User = createDB.define("user", {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    name: DataTypes.INTEGER,
    email: DataTypes.INTEGER,
    password: DataTypes.INTEGER,
});

module.exports = User;