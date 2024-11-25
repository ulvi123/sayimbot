import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { DataManagementController } from './data-management/data-management.controller';
import { DataManagementService } from './data-management/data-management.service';
import { PrismaService } from './prisma/prisma.service';
import * as path from 'path';


@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(__dirname, '..', '.env'),
      cache: false,
    }),
  ],
  controllers: [AppController,DataManagementController],
  providers: [AppService,DataManagementService,PrismaService],
})


export class AppModule {}
