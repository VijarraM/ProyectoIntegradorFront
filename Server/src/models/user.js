const { DataTypes } = require("sequelize");
const hashPassword = require("../utils/hashFunction");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  User.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await hashPassword(user.password);
    }
    if (user.email) {
      user.email = user.email.toLowerCase();
    }
  });

  User.beforeUpdate(async (user) => {
    if (user.changed("password")) {
      user.password = await hashPassword(user.password);
    }
    if (user.email) {
      user.email = user.email.toLowerCase();
    }
  });

  return User;
};
