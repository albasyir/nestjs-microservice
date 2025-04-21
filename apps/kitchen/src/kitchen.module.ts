import { Logger, Module } from '@nestjs/common';
import { KitchenController } from './kitchen.controller';
import { KitchenService } from './kitchen.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { rabbitmqConfigRegistration } from './kitchen.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/kitchen/.env',
      isGlobal: true,
    }),

    RabbitMQModule.forRootAsync({
      ...rabbitmqConfigRegistration.asProvider(),

      useFactory(config: ConfigType<typeof rabbitmqConfigRegistration>) {
        return {
          name: 'order.confirmation',
          logger: new Logger(RabbitMQModule.name),
          uri: `amqp://${config.user}:${config.pass}@${config.host}:${config.port}`,
          connectionInitOptions: { wait: false },
          enableControllerDiscovery: true,
        };
      },
    }),
  ],
  controllers: [KitchenController],
  providers: [KitchenService, KitchenController],
})
export class KitchenModule {}
