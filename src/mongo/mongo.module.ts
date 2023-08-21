import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from "@nestjs/mongoose";
import { MongoConfigService } from "./mongoConfig.service";

@Module({
  imports: [
    ConfigModule
  ],
  providers: [MongoConfigService],
  exports: [MongooseModule],
})
export class MongoModule {}
