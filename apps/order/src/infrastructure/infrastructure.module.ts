import { Module } from '@nestjs/common';
import { ResolvedRabbitMQModule } from './rabbitmq/rabbitmq.module';
import { ResolvedConfigModule } from './config/config.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ResolvedTypeOrmModule } from './typeorm/typeorm.module';

@Module({
  imports: [
    ResolvedTypeOrmModule,
    ResolvedRabbitMQModule,
    ResolvedConfigModule
  ],
  exports: [
    ResolvedRabbitMQModule
  ]
})
export class InfrastructureModule {}
