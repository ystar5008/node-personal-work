'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'UserId',
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.Posts, {
        targetKey: 'postId',
        foreignKey: 'PostId',
        onDelete: 'CASCADE',
      });

    }
  }
  Comments.init(
    {
      commentId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      PostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nickname: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
        unique: true,
      },
      comment: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
        unique: true,
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};