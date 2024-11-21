// data-management.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import ExcelJS from 'exceljs';



@Injectable()
export class DataManagementService {
    constructor(private prisma: PrismaService) { }

    async generateData(date: string) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        // Generate some sample data
        const sampleData = [
            {
                startTime: new Date(startOfDay.getTime() + 8 * 60 * 60 * 1000), // 8:00 AM
                endTime: new Date(startOfDay.getTime() + 9 * 60 * 60 * 1000),   // 9:00 AM
                material: 'Bread',
                count: Math.floor(Math.random() * 10000) + 1000, // Random number between 1000 and 11000
                format: 'xlsx'
            },
            {
                startTime: new Date(startOfDay.getTime() + 9 * 60 * 60 * 1000), // 9:00 AM
                endTime: new Date(startOfDay.getTime() + 10 * 60 * 60 * 1000),  // 10:00 AM
                material: 'Pastry',
                count: Math.floor(Math.random() * 5000) + 500,  // Random number between 500 and 5500
                format: 'xlsx'
            },
        ];

        try {
            const createdEntries = await this.prisma.dataEntry.createMany({
                data: sampleData,
            });
            return {
                message: 'Data generated successfully',
                count: createdEntries.count
            };
        } catch (error) {
            console.error('Error generating data:', error);
            throw new Error('Failed to generate data');
        }
    }

    async getData(date: string) {
        const startOfDay = new Date(date);
        const endOfDay = new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000);

        try {
            const result = await this.prisma.dataEntry.findMany({
                where: {
                    startTime: {
                        gte: startOfDay,
                        lt: endOfDay,
                    },
                },
            });
            return result; // This should always be an array, even if empty
        } catch (error) {
            console.error('Error fetching data:', error);
            return []; // Return empty array on error
        }
    }

    async generateExcelFile(date: string): Promise<Buffer> {
        const data = await this.getData(date);
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Data');

        worksheet.addRow(['Start Time', 'End Time', 'Material', 'Count', 'Format']);

        data.forEach((item) => {
            worksheet.addRow([
                new Date(item.startTime).toLocaleString(),
                new Date(item.endTime).toLocaleString(),
                item.material,
                item.count,
                item.format
            ]);
        });

        return await workbook.xlsx.writeBuffer() as Buffer;
    }
}