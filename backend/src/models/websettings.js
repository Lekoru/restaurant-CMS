const websettings = function (sequelize, DataTypes) {
  return sequelize.define(
    'websettings',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      MainPhoto: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      MainTitle: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      MainDesc: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      RestaurantDesc: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'websettings',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'websettings_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  )
}
export default websettings
