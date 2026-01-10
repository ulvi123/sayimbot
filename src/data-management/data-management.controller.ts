// data-management.controller.ts
import { Controller, Get, Post, Body, Query, Res, Header } from '@nestjs/common';
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
    @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    @Header('Content-Disposition', 'attachment; filename="bread_production_data.xlsx"')
    async downloadExcel(@Query('date') date: string, @Res() res: Response) {
        console.log('Received download request for date:', date);
        try {
            console.log('Generating Excel file...');
            const buffer = await this.dataManagementService.generateExcelFile(date);
            console.log('Excel file generated successfully');
            res.send(buffer);
        } catch (error) {
            console.error('Error generating Excel file:', error);
            res.status(500).json({ message: 'Error generating Excel file', error: error.message, stack: error.stack });
        }
    }
}