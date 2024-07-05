import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
import {dbConfig} from './index.js';

const sequelize = new Sequelize(dbConfig[env]);

export default sequelize;