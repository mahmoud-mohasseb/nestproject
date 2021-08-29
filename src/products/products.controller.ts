import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Express } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('products')
// constructor used for the following requests
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('image') prodImg: string,
    @Body('price') prodPrice: number,
  ) {
    const generateID = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodImg,
      prodPrice,
    );
    console.log(generateID);
    return { id: generateID };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    console.log(products);
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updatedProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('image') prodImg: string,
    @Body('price') prodPrice: number,
  ) {
    await this.productsService.updatedProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodImg,
      prodPrice,
    );
    return null;
  }
  // paralink id
  @Delete(':id')
  async removeproduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
