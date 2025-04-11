import * as ExcelJS from 'exceljs';
import type { ExcelSuccessStory, SuccessStory } from '../types/successStory';
import { getImagePath } from './imageUtils';

export const loadSuccessStoriesFromExcel = async (file: File): Promise<SuccessStory[]> => {
  try {
    const workbook = new ExcelJS.Workbook();
    const arrayBuffer = await file.arrayBuffer();
    await workbook.xlsx.load(arrayBuffer);
    
    const worksheet = workbook.getWorksheet(1);
    if (!worksheet) {
      throw new Error('No worksheet found in Excel file');
    }

    const jsonData: ExcelSuccessStory[] = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row
      const rank = row.getCell(4).value?.toString() || '#1';
      if (rank !== '#1' && rank !== '#2' && rank !== '#3') {
        throw new Error(`Invalid rank value: ${rank}`);
      }

      const rowData: ExcelSuccessStory = {
        id: row.getCell(1).value?.toString() || '',
        name: row.getCell(2).value?.toString() || '',
        productHuntUrl: row.getCell(3).value?.toString() || '',
        rank: rank as '#1' | '#2' | '#3',
        upvotes: row.getCell(5).value?.toString() || '',
        logoFileName: row.getCell(6).value?.toString() || '',
      };
      jsonData.push(rowData);
    });

    return jsonData.map(story => ({
      id: story.id,
      name: story.name,
      productHuntUrl: story.productHuntUrl,
      rank: story.rank as '#1' | '#2' | '#3',
      upvotes: story.upvotes,
      logoPath: getImagePath(`/images/success-stories/${story.logoFileName}`)
    }));
  } catch (error) {
    console.error('Error reading Excel file:', error);
    throw error;
  }
};

export async function readExcelFile(file: File): Promise<any[]> {
  const workbook = new ExcelJS.Workbook();
  const arrayBuffer = await file.arrayBuffer();
  await workbook.xlsx.load(arrayBuffer);
  
  const worksheet = workbook.getWorksheet(1);
  if (!worksheet) {
    throw new Error('No worksheet found in Excel file');
  }

  const rows: any[] = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // Skip header row
    const rowData: any = {};
    row.eachCell((cell, colNumber) => {
      const headerCell = worksheet.getRow(1).getCell(colNumber);
      const header = headerCell.value?.toString() || `Column${colNumber}`;
      rowData[header] = cell.value;
    });
    rows.push(rowData);
  });

  return rows;
}