import { Activity, Business, Achievement, VolunteerYearData } from '@/data/sampleData';

export interface HomePageProps {
  balance: number;
  activities: Activity[];
  setCurrentPage: (page: PageType) => void;
}

export interface EarnPageProps {
  // If you need to add props for EarnPage later
}

export interface SpendPageProps {
  businesses: Business[];
}

export interface HistoryPageProps {
  activities: Activity[];
}

export interface ProfilePageProps {
  activities: Activity[];
  achievements: Achievement[];
  volunteerData: VolunteerYearData;
  showReport: boolean;
  setShowReport: (show: boolean) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
}

// Navigation related types
export interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

// Common shared types
export type PageType = 'home' | 'earn' | 'spend' | 'history' | 'profile';