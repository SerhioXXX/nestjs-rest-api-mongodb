import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/dto/products.module';
import { MongooseModule } from '@nestjs/mongoose';

const password = 'serhiox123';
const dbName = 'products';
@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      `mongodb+srv://serhiox:${password}@cluster0.ecoqd.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
