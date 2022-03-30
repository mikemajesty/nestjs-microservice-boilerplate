import { GlobalModule } from '@app/global/global.module';
import { Module } from '@nestjs/common';

import { CommonModule } from './common/module';
import { HealthModule } from './health/module';
@Module({
  imports: [HealthModule, GlobalModule, CommonModule],
  providers: [],
  exports: [],
})
export class AppModule {}
