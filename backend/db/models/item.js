const { Model } = require('sequelize');

module.exports = (sequelize, { DataTypes, fn }) => {
  class Item extends Model {
    static associate ({ User }) {
      Item.belongsTo(User, { foreignKey: 'userId' });
    }
  }

  Item.init({
    recurring: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    income: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    amount: DataTypes.STRING,
    effectiveDate: {
      type: DataTypes.DATE,
      defaultValue: fn('now')
    },
    startDate: {
      type: DataTypes.DATE,
      defaultValue: fn('now')
    },
    endDate: DataTypes.DATE,
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
    udpatedAt: {
      type: DataTypes.DATE,
      defaultValue: fn('now')
    }
  }, {
    sequelize,
    modelName: 'Item'
  });

  return Item;
};
