import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private _blacklistedToken: any;
  public get blacklistedToken(): any {
    return this._blacklistedToken;
  }
  public set blacklistedToken(value: any) {
    this._blacklistedToken = value;
  }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}