import type { SuccessStory } from '../types/successStory';

export const fetchSuccessStories = async (): Promise<SuccessStory[]> => {
  try {
    const response = await fetch('/data/success-stories.csv');
    const text = await response.text();
    
    // Parse CSV
    const lines = text.split('\n');
    const headers = lines[0].split(',');
    
    const stories: SuccessStory[] = lines
      .slice(1) // Skip header row
      .filter(line => line.trim()) // Skip empty lines
      .map(line => {
        const values = line.split(',');
        return {
          id: values[0],
          name: values[1],
          productHuntUrl: values[2],
          rank: values[3] as '#1' | '#2' | '#3',
          upvotes: values[4],
          logoPath: `/images/success-stories/${values[5]?.trim()}`
        };
      });

    return stories;
  } catch (error) {
    console.error('Error fetching success stories:', error);
    return [];
  }
};