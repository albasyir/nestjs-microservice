import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Global, Logger, Module } from '@nestjs/common';
import { rabbitmqConfigRegistration } from './rabbitmq.config';
import { ConfigType } from '@nestjs/config';

@Global()
@Module({
  imports: [
    RabbitMQModule.forRootAsync({
      ...rabbitmqConfigRegistration.asProvider(),

      useFactory(config: ConfigType<typeof rabbitmqConfigRegistration>) {
        return {
          logger: new Logger(RabbitMQModule.name),
          uri: `amqp://${config.user}:${config.pass}@${config.host}:${config.port}`,
          connectionInitOptions: { wait: false },
          enableControllerDiscovery: false,
          exchanges: [
            {
              name: 'orders',
              type: 'fanout',
            },
          ],
        };
      },
    }),
  ],
  exports: [RabbitMQModule],
})
export class ResolvedRabbitMQModule {}
