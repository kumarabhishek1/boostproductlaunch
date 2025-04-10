import { read, utils } from 'xlsx';
import type { ExcelSuccessStory, SuccessStory } from '../types/successStory';
import { getImagePath } from './imageUtils';

export const loadSuccessStoriesFromExcel = async (file: File): Promise<SuccessStory[]> => {
  try {
    const data = await file.arrayBuffer();
    const workbook = read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json<ExcelSuccessStory>(worksheet);

    return jsonData.map(story => ({
      id: story.id,
      name: story.name,
      productHuntUrl: story.productHuntUrl,
      rank: story.rank as '#1' | '#2' | '#3',
      upvotes: story.upvotes,
      logoPath: getImagePath(`/images/success-stories/${story.logoFileName}`)
    }));
  } catch (error) {
    console.error('Error loading success stories from Excel:', error);
    throw new Error('Failed to load success stories from Excel file');
  }
};