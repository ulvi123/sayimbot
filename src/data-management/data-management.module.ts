// data-management.module.ts
import { Module } from '@nestjs/common';
import { DataManagementController } from './data-management.controller';
import { DataManagementService } from '../data-management/data-management.service';
import { PrismaService } from '../prisma/prisma.service'; // Assume you have a PrismaService

@Module({
  controllers: [DataManagementController],
  providers: [DataManagementService, PrismaService],
})
export class DataManagementModule {}