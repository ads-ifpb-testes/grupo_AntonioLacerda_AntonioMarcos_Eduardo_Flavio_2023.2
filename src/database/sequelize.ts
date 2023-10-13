import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost:5432/CrimeAlert'
);

(async function () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;
