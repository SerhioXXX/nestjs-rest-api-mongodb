import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response, Request } from 'express';
import { ProductsService } from './dto/products.service';
import { Product } from './schemas/product.schema';

/*Как это выглядит в express*/
// app.useExempl((req, res, next) => {
//  res.status(201).end('Пока')
// })

@Controller('products') // тут делаються запросы
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {} // инжектим наш productsService(в нем логика) с dto
  // @Get()
  // //@Redirect('https://google.com',  301)
  // getAll(@Req() req: Request, @Res() res: Response): string {
  //   res.status(201).end('Пока')
  //   return 'getAll products';
  // }

  @Get()
  getAll(): Promise<Product[]> {
    //return 'getAll products';
    return this.productsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.getById(id);
    //return 'getOne ' + id;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) // добавит возвращение статуса после отработки запроса
  @Header('Cache-Control', 'none')
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
    //return `Title ${createProductDto.title} Price: ${createProductDto.price}`;
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(id)
  }
  @Put(':id')
  update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string): Promise<Product> {
    return this.productsService.update(id, updateProductDto)
  }
}
