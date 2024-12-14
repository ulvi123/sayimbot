// data-management.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as ExcelJS from 'exceljs';
import { Prisma } from '@prisma/client';



@Injectable()
export class DataManagementService {
    constructor(private prisma: PrismaService) { }

    async generateData(date: string) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(startOfDay);
        endOfDay.setHours(23, 59, 59, 999);

        try {
            return await this.prisma.$transaction(async (prisma) => {
                // Check if data already exists for this date
                const existingData = await prisma.dataEntry.findFirst({
                    where: {
                        startTime: {
                            gte: startOfDay,
                            lte: endOfDay
                        }
                    }
                });

                if (existingData) {
                    throw new Error('Data already exists for this date');
                }

                const sampleData = [];

                for (let hour = 0; hour < 24; hour++) { // Generate data for all 24 hours
                    sampleData.push({
                        startTime: new Date(startOfDay.getTime() + hour * 60 * 60 * 1000),
                        endTime: new Date(startOfDay.getTime() + (hour + 1) * 60 * 60 * 1000),
                        material: 'Bread',
                        count: Math.floor(Math.random() * 1000) + 500, // Random number between 500 and 1500
                        format: 'xlsx'
                    });
                }

                const createdEntries = await prisma.dataEntry.createMany({
                    data: sampleData,
                });

                return {
                    message: 'Data generated successfully',
                    count: createdEntries.count
                };
            });
        } catch (error) {
            console.error('Error generating data:', error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new Error('Unique constraint failed. Data might already exist for this date.');
                }
            }
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
                orderBy: {
                    startTime: 'asc'
                }
            });
            return result; // This should always be an array, even if empty
        } catch (error) {
            console.error('Error fetching data:', error);
            return []; // Return empty array on error
        }
    }

    async generateExcelFile(date: string): Promise<Buffer> {
        console.log('Starting Excel file generation for date:', date);
        try {
            const data = await this.getData(date);
            console.log('Retrieved data:', data);

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Bread Production Data');

            // Add headers
            worksheet.addRow(['Date', 'Start Time', 'End Time', 'Material', 'Count', 'Format']);

            // Add data
            data.forEach((item) => {
                const startTime = new Date(item.startTime);
                worksheet.addRow([
                    startTime.toLocaleDateString(),
                    startTime.toLocaleTimeString(),
                    new Date(item.endTime).toLocaleTimeString(),
                    item.material,
                    item.count,
                    item.format
                ]);
            });

            // Auto-fit columns
            worksheet.columns.forEach(column => {
                let maxLength = 0;
                column.eachCell({ includeEmpty: true }, cell => {
                    const columnLength = cell.value ? cell.value.toString().length : 10;
                    if (columnLength > maxLength) {
                        maxLength = columnLength;
                    }
                });
                column.width = maxLength < 10 ? 10 : maxLength;
            });

            // Add totals
            const totalRow = worksheet.addRow(['Total', '', '', '', `=SUM(E2:E${data.length + 1})`, '']);
            totalRow.font = { bold: true };

            console.log('Excel workbook created, writing to buffer...');
            return await workbook.xlsx.writeBuffer() as Buffer;
        } catch (error) {
            console.error('Error in generateExcelFile:', error);
            console.error('Error stack:', error.stack);
            throw error;
        }
    }
}