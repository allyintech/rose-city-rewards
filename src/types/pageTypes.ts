import React from 'react';
import { VolunteerActivity, Business, Achievement, VolunteerData, YearData } from '@/types/dataTypes';

// Home Page Props
export interface HomePageProps {
  balance: number;
  activities: VolunteerActivity[];
  setCurrentPage: (page: PageType) => void;
}

// Earn Page Props (Placeholder for future use)
export interface EarnPageProps {}

// Spend Page Props
export interface SpendPageProps {
  businesses: Business[];
}

// History Page Props
export interface HistoryPageProps {
  activities: VolunteerActivity[];
}

// Profile Page Props
export interface ProfilePageProps {
  activities: VolunteerActivity[];
  achievements: Achievement[];
  volunteerData: VolunteerData;
  showReport: boolean;
  setShowReport: (show: boolean) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
}

// Navigation Button Props
export interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

// Page Type Definitions
export type PageType = 'home' | 'earn' | 'spend' | 'history' | 'profile';
