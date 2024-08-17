import { Module } from '@nestjs/common';
import { StorageModule } from './storage/storage.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ColumnsModule } from './columns/columns.module';

@Module({
  imports: [StorageModule, AuthModule, UsersModule, ColumnsModule],
})
export class AppModule {}
