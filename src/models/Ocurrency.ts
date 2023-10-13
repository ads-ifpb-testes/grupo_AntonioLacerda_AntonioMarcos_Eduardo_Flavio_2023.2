import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize';

const Ocurrency = sequelize.define('ocurrency', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  type: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  public: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  location: {
    type: DataTypes.GEOMETRY,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
});

(async () => {
  await Ocurrency.sync();
})();

export { Ocurrency };
