import { Logger, Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { rabbitmqConfigRegistration } from './notification.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/notification/.env',
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
  controllers: [NotificationController],
  providers: [NotificationService, NotificationController],
})
export class NotificationModule {}
