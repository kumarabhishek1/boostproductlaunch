import type { SuccessStory } from '../types/successStory';
import { loadSuccessStoriesFromExcel } from './excelUtils';

export const fetchSuccessStories = async (): Promise<SuccessStory[]> => {
  try {
    const response = await fetch('/data/success-stories.xlsx');
    const blob = await response.blob();
    const file = new File([blob], 'success-stories.xlsx');
    const stories = await loadSuccessStoriesFromExcel(file);
    return stories;
  } catch (error) {
    console.error('Error fetching success stories:', error);
    return [];
  }
};