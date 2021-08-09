const { Model } = require('sequelize');

module.exports = (sequelize, { DataTypes, fn }) => {
  class Account extends Model {
    async postItem (itemBody) {
      return await this.createItem({ ...itemBody, userId: this.userId });
    }

    async getItemsByExactDate (effectiveMonth, effectiveDate, effectiveYear) {
      return await this.getItems({
        where: {
          effectiveMonth,
          effectiveDate,
          effectiveYear
        }
      });
    }

    async getRecurringItemsByDate (effectiveDate) {
      return await this.getItems({
        where: {
          effectiveDate,
          recurring: true
        }
      });
    }

    async getItemsByMonth (effectiveMonth) {
      return await this.getItems({ where: { effectiveMonth } });
    }

    async getRecurringItems () {
      return await this.getItems({ where: { recurring: true } });
    }

    async getSingleItems () {
      return await this.getItems({ where: { recurring: false } });
    }

    static associate ({ User, Item }) {
      Account.belongsTo(User, { foreignKey: 'userId' });
      Account.hasMany(Item, { foreignKey: 'accountId' });
    }
  }

  Account.init({
    name: DataTypes.STRING(100),
    description: DataTypes.TEXT,
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
