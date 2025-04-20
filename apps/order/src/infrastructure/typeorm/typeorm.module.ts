import { ConfigType } from "@nestjs/config"
import { typeormConfigRegistration } from './typerom.config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Logger } from "@nestjs/common";

export const ResolvedTypeOrmModule = TypeOrmModule.forRootAsync({
  ...typeormConfigRegistration.asProvider(),

  async useFactory(config: ConfigType<typeof typeormConfigRegistration>): Promise<TypeOrmModuleOptions> {
    return {
      logging: true,
      type: 'mysql',
      host: config.host,
      port: config.port,
      username: config.user,
      password: config.pass
    }
  },
})

