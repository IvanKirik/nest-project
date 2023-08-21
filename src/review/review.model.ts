import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema({timestamps: true})
export class Review extends Document {

  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  productId: string;
}

export const ReviewModelSchema = SchemaFactory.createForClass(Review);
