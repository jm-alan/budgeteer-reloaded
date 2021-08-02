const { Model } = require('sequelize');

module.exports = (sequelize, { DataTypes, fn }) => {
  class Item extends Model {
    static associate ({ User, Account }) {
      Item.belongsTo(User, { foreignKey: 'userId' });
      Item.belongsTo(Account, { foreignKey: 'accountId' });
    }
  }

  Item.init({
    name: DataTypes.STRING(100),
    description: DataTypes.TEXT,
    recurring: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isIncome: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    amount: DataTypes.STRING,
    effectiveDate: DataTypes.INTEGER,
    effectiveFullDate: DataTypes.STRING,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users'
      }
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Accounts'
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
    modelName: 'Item'
  });

  return Item;
};
