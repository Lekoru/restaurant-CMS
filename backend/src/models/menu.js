const menu = function (sequelize, DataTypes) {
  return sequelize.define(
    'menu',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      DishName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      DishDesc: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Ingredients: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Photo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Price: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'menu',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'menu_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  )
}
export default menu
