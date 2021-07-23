const { Model } = require('sequelize');

module.exports = (sequelize, { DataTypes, fn }) => {
  class Account extends Model {
    static associate ({ User, Item }) {
      Account.belongsTo(User, { foreignKey: 'userId' });
      Account.hasMany(Item, { foreignKey: 'accountId' });
    }
  }

  Account.init({
    balance: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: fn('now')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: fn('now')
    }
  }, {
    sequelize,
    modelName: 'Account'
  });

  return Account;
};
