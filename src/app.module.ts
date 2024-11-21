import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { DataManagementController } from './data-management/data-management.controller';
import { DataManagementService } from './data-management/data-management.service';
import { PrismaService } from './prisma/prisma.service';


@Module({
  imports: [AuthModule,PrismaModule],
  controllers: [AppController,DataManagementController],
  providers: [AppService,DataManagementService,PrismaService],
})


export class AppModule {}
