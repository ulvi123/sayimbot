import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CameraService {
    constructor(private prisma: PrismaService) { }


    async activateCamera(cameraId: number, resolution: string) {
        try {
            const cameraIsActivate = await this.prisma.camera.update({
                where: { id: cameraId },
                data: { isRecording: true, status: 'Active', resolution: resolution },
            })
            return cameraIsActivate
        } catch (error) {
            throw new Error(`Failed to activate camera with id ${cameraId}: ${error.message}`);
        }
    }

    async deactivateCamera(cameraId: number) {
        try {
            const cameraIsdeactive = await this.prisma.camera.update({
                where: { id: cameraId },
                data: { isRecording: false, status: 'Inactive' }
            })

            return cameraIsdeactive
        } catch (error) {
            throw new Error(`Failed to deactivate camera with id ${cameraId}: ${error.message}`);
        }
    }


    // Get camera details
    async getCameraById(cameraId: number) {
        try {
            return await this.prisma.camera.findUnique({
                where: { id: cameraId },
            });
        } catch (error) {
            throw new Error(`Failed to fetch camera with id ${cameraId}: ${error.message}`);
        }
    }


    async getAllCameras() {
        try {
            return await this.prisma.camera.findMany();
        } catch (error) {
            throw new Error(`Failed to fetch cameras: ${error.message}`);
        }
    }







}
