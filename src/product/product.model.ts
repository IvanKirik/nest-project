import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

class ProductCharacteristics {

  @Prop()
  name: string;

  @Prop()
  value: string;
}

@Schema({timestamps: true})
export class Product extends Document {

  @Prop()
  image: string;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  oldPrice?: number;

  @Prop()
  credit: number;

  @Prop()
  description: string;

  @Prop()
  advantages: string;

  @Prop()
  disAdvantages: string;

  @Prop({type: () => [String]})
  categories: string[];

  @Prop({type: () => [String]})
  tags: string[];

  @Prop({type: () => [ProductCharacteristics], _id: false})
  characteristics: ProductCharacteristics[]
}

export const ProductModelSchema = SchemaFactory.createForClass(Product);
