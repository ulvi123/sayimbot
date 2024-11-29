import { Module } from '@nestjs/common';
import { CameraService } from './camera.service';
import { CameraController } from './camera.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';  // Import PrismaService for database interaction


@Module({
    imports: [],  // You can import other modules if needed
    controllers: [CameraController],  // Registers the camera controller
    providers: [CameraService, PrismaService],
    exports: [CameraService],
})
export class CameraModule {}
