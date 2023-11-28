// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Below: from line 8 to 39 => references each sequelize model relationship. 
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  allowNull: false
}
);

Category.hasMany(Product, {
  foreignKey: 'category_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  allowNull: false
})

Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },

  as: 'Product_Tag'
})

Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },

  as: 'Tag_product'
})


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
