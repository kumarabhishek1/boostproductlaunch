export interface SuccessStory {
  id: string;
  name: string;
  productHuntUrl: string;
  rank: '#1' | '#2' | '#3';
  upvotes: string;
  logoPath: string;
}

export interface ExcelSuccessStory {
  id: string;
  name: string;
  productHuntUrl: string;
  rank: string;
  upvotes: string;
  logoFileName: string;
}