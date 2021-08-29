import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/product.module';
import { APIModule } from './api/api.module';

@Module({
  imports: [
    ProductsModule,
    // uploading images
    APIModule,
    MongooseModule.forRoot(
      'mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b7skb.mongodb.net/nestjsProduct?retryWrites=true&w=majority',
    ),
    // MulterModule.register({
    //   dest: './uploads',
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
