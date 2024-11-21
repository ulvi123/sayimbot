// data-management.controller.ts
import { Controller, Get, Post, Body, Query, Res } from '@nestjs/common';
import { DataManagementService } from './data-management.service';
import { Response } from 'express';

@Controller('data-management')
export class DataManagementController {
    constructor(private dataManagementService: DataManagementService) { }

    @Get()
    async getData(@Query('date') date: string) {
        console.log('Get request received for date:', date);
        return this.dataManagementService.getData(date);
    }
    @Post('generate')
    async generateData(@Body('date') date: string) {
        console.log('Generate request received for date:', date);
        return this.dataManagementService.generateData(date);
    }
    @Get('download')
    async downloadExcel(@Query('date') date: string, @Res() res: Response) {
        const buffer = await this.dataManagementService.generateExcelFile(date);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="data_${date}.xlsx"`);
        res.setHeader('Content-Length', buffer.length.toString());

        res.end(buffer);
    }
}