import { Module } from '@nestjs/common';

import { APIController } from './api.controller';
import { APIservice } from './api.service';
// import { ProductSchema } from './product.model';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [APIController],
  providers: [APIservice],
})
export class APIModule {}
