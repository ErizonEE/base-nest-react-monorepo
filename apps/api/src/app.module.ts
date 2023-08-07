import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { AppAuthGuard } from './common/decorators/app-auth.guard';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, DatabaseModule, UsersModule],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: AppAuthGuard }],
})
export class AppModule {}
