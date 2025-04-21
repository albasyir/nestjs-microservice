import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { AppController } from './app.controller';

@Module({
  imports: [InfrastructureModule, DomainModule],
  controllers: [AppController],
})
export class AppModule {}
