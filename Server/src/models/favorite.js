const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Favorite",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Alive", "Dead", "unknown"),
        defaultValue: "Alive",
        allowNull: false,
      },
      species: {
        type: DataTypes.ENUM(
          "Human",
          "Humanoid",
          "Alien",
          "Animal",
          "Robot",
          "Disease",
          "Parasite",
          "Crononberg",
          "Mythological Creature",
          "Poopybutthole",
          "unknown"
        ),
        defaultValue: "unknown",
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Genderless", "unknown"),
        defaultValue: "unknown",
        allowNull: false,
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        unique: true,
        /* allowNull: false */
      },
    },
    { timestamps: false }
  );
};
