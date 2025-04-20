import { ConfigModule } from '@nestjs/config';

export const ResolvedConfigModule = ConfigModule.forRoot({
  envFilePath: "apps/order/.env",
  isGlobal: true
});
