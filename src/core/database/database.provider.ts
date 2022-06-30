import { Sequelize } from 'sequelize-typescript';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';
import { Role } from '../../modules/users/role.entity';
import { UserRole } from '../../modules/users/user-role.entity';

export const databaseProvider = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      let forceSync = true;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;

          config.dialectOptions = {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          };

          forceSync = true;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Role, UserRole]);
      await sequelize.sync({ force: forceSync });
      return sequelize;
    },
  },
];
