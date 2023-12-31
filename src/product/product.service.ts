import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./product.model";
import { CreateProductDto } from "./dto/create-product.dto";
import { FindProductDto } from "./dto/find-product.dto";
import { Review } from "../review/review.model";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>
  ) {
  }

  async create(dto: CreateProductDto) {
    return this.productModel.create(dto);
  }

  async findById(id: string) {
    return this.productModel.findById(id).exec();
  }

  async deleteById(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async updateDyId(id: string, dto: CreateProductDto) {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findWidthReviews(dto: FindProductDto) {
    return await this.productModel.aggregate([
      {
        $match: {
          categories: dto.category
        }
      },
      {
        $sort: {
          _id: 1
        }
      },
      {
        $limit: dto.limit
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "productId",
          as: "reviews"
        }
      },
      {
        $addFields: {
          reviewCount: {
            $size: "$reviews"
          },
          reviewAvg: {
            $avg: "$reviews.rating"
          },
          reviews: {
            $function: {
              body: `function(review) {
                review.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                return review
              }`,
              args: ['$reviews'],
              lang: 'js'
            }
          }
        }
      }
    ]).exec() as (Product & { reviews: Review[], reviewCount: number, reviewAvg: number })[];
  }
}
