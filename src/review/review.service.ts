import { Injectable } from "@nestjs/common";
import { Review } from "./review.model";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateReviewDto } from "./dto/create-review.dto";

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>
  ) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    return this.reviewModel.create(dto);
  }

  async delete(id: string): Promise<Review | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<Review[]> {
    return this.reviewModel.find({productId: productId}).exec()
  }

  async deleteByProductId(productId: string) {
    return this.reviewModel.deleteMany({productId: productId}).exec()
  }
}
