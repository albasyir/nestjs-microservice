import { ConfigType } from '@nestjs/config';
import { typeormConfigRegistration } from './typeorm.config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';

import CreateOrderTable1745210070564 from './migrations/1745210070564-create_order_table';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const ResolvedTypeOrmModule = TypeOrmModule.forRootAsync({
  ...typeormConfigRegistration.asProvider(),

  useFactory(
    config: ConfigType<typeof typeormConfigRegistration>,
  ): TypeOrmModuleOptions {
    const logger = new Logger(TypeOrmModule.name);

    logger.verbose('connection will use', {
      host: config.host,
      port: config.port,
      username: config.user,
      database: config.name,
    });

    if (config.options.migration.autoRun)
      logger.verbose('migration will be executed');

    return {
      logging: true,
      type: 'mysql',
      host: config.host,
      port: config.port,
      username: config.user,
      password: config.pass,
      database: config.name,
      namingStrategy: new SnakeNamingStrategy(),
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      migrationsRun: config.options.migration.autoRun,
    };
  },
});
