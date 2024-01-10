const users = function (sequelize, DataTypes) {
  return sequelize.define(
    'users',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Role: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'users_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  )
}
export default users
