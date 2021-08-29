import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  // constructor for product model
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(
    title: string,
    desc: string,
    image: string,
    price: number,
  ) {
    const newProduct = new this.productModel({
      title,
      description: desc,
      image,
      price,
    });
    console.log(newProduct);

    const result = await newProduct.save();
    // console.log(result);
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    // console.log(products);
    return products.map((product) => ({
      id: product.id,
      title: product.title,
      image: product.image,
      description: product.description,
      price: product.price,
    }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      image: product.image,
      description: product.description,
      price: product.price,
    };
  }

  async updatedProduct(
    productId: string,
    title: string,
    desc: string,
    image: string,
    price: number,
  ) {
    const updatedproducted = await this.findProduct(productId);
    if (title) {
      updatedproducted.title = title;
    }
    if (desc) {
      updatedproducted.description = desc;
    }
    if (image) {
      updatedproducted.image = image;
    }
    if (price) {
      updatedproducted.price = price;
    }
    updatedproducted.save();
  }

  async deleteProduct(prodId) {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    // console.log(result.n);
    if (result.n === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }

  // promise to find product
  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}
