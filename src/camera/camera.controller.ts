import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CameraService } from './camera.service';
import { retry } from 'rxjs';

@Controller('camera')
export class CameraController {
    constructor(private cameraService: CameraService) { }

    @Post(':id/activate')
    async activateCamera(
        @Param('id') id: number,
        @Body() body: { resolution?: string }) {
        try {
            const updatedCamera = await this.cameraService.activateCamera(id, body.resolution);
            return updatedCamera
        } catch (error) {
            throw new Error(`Failed to activate camera with id ${id}: ${error.message}`);
        }
    }


    @Post(':id/deactivate')
    async deactivatecamera(@Param('id') id: number) {
        try {
            const deactivatedCamera = await this.cameraService.deactivateCamera(id);
            return deactivatedCamera
        } catch (error) {
            throw new Error(`Failed to deactivate camera with id ${id}: ${error.message}`);
        }
    }


    @Get(':id')
    async getCameraById(@Param('id') id: number) {
        try {
            const foundCamera = await this.cameraService.getCameraById(id);
            if(!foundCamera) throw new Error (`Camera with id ${id} not found`)
            return foundCamera
        } catch (error) {
            throw new Error(`Failed to fetch camera with id ${id}: ${error.message}`);
        }
    }

    @Get() async getAllCameras() {
        try {
            const cameras = await this.cameraService.getAllCameras();
            return cameras;
        } catch (error) {
            throw new Error(`Failed to fetch cameras: ${error.message}`);
        }
    }

    



}
