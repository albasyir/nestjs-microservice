import { Logger, Module } from '@nestjs/common';
import { KitchenController } from './kitchen.controller';
import { KitchenService } from './kitchen.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      logger: new Logger(RabbitMQModule.name),
      uri: `amqp://rabbitmq:mypassword@rabbitmq:5672`,
      connectionInitOptions: { wait: false },
      enableControllerDiscovery: true,
    }),
  ],
  controllers: [KitchenController],
  providers: [KitchenService, KitchenController],
})
export class KitchenModule {}
