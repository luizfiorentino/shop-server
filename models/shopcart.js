'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shopCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  shopCart.init({
    productId: DataTypes.INTEGER,
    productName: DataTypes.STRING,
    price: DataTypes.FLOAT,
    userEmail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'shopCart',
  });
  return shopCart;
};