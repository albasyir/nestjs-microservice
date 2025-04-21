import { Logger, Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      name: 'order.confirmation',
      logger: new Logger(RabbitMQModule.name),
      uri: `amqp://rabbitmq:mypassword@rabbitmq:5672`,
      connectionInitOptions: { wait: false },
      enableControllerDiscovery: true,
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationController],
})
export class NotificationModule {}
