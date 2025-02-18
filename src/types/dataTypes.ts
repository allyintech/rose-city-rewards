// Base Types
export interface BaseMetric {
  id?: string; // Unique identifier for all entities
  createdAt?: Date;
  updatedAt?: Date;
}

// Location Details
export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

// Common Event Details
export interface EventDetails extends BaseMetric {
  name: string;
  organization: string;
  category: string;
  hours: number;
  date: Date;
  time: string;
  description: string;
  impact: string;
  supervisorName: string;
  supervisorEmail: string;
  address: Address;
  spots_total: number;
  spots_filled?: number;
  credits: number;
}

// Form Data for Creating & Editing Events (UI Focused)
export interface EventFormData {
  name: string;
  organization: string;
  category: string;
  hours: number;
  date: Date;
  time: string;
  description: string;
  impact: string;
  supervisorName: string;
  supervisorEmail: string;
  address: Address;
  credits: number;
  spots_total: number;
}

// Simplified Event Registration
export interface EventRegistration extends BaseMetric {
  eventId: string;
  volunteerId: string;
  status: 'registered' | 'attended' | 'canceled';
}

// App Usage Metrics
export interface AppUsageMetrics {
  totalUsers: number;
  activeUsers: number;
  totalEvents: number;
  totalHours: number;
  totalCredits: number;
  totalBusinesses: number;
  totalVolunteers: number;
}

// Volunteer Types
export interface Volunteer extends BaseMetric {
  name: string;
  email?: string;
  joinDate: Date;
  totalHours: number;
  balance: number;
  totalEarned: number;
  totalSpent: number;
  impactScore?: number;
  streak?: number;
  achievements?: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  progress: number;
}

// Volunteer Activity Tracking
export interface VolunteerActivity extends EventDetails {
  code: string; // Unique identifier for check-in
}

// Volunteer Report Data
export interface YearData {
  totalHours: number;
  activities: VolunteerActivity[];
  categoryBreakdown: Record<string, number>;
}

export interface VolunteerData {
  [year: string]: YearData;
}

export interface VolunteerReportProps {
  currentYear?: string;
  volunteerData?: VolunteerData;
}

// Transaction & Credit Handling
export interface TransactionRecord extends BaseMetric {
  type: 'earned' | 'spent';
  amount: number;
  description: string;
  date: Date;
  hours?: number;
  businessId?: string;  // ID of business for redemptions
  businessName?: string; // Name of business for display
  volunteerId: string; 
  eventId?: string; // Only for earned credits
}


// Business Details
export interface Business extends BaseMetric {
  name: string;
  phone: string;
  address: Address;
  category: string;
  credits: number;
  description: string;
  tags: string[];
  website?: string;
  email?: string;
  active?: boolean;
  rewards?: string;
  emoji?: string;
  distance?: string;
}

// Program Metrics & Reports
export interface ProgramImpact extends BaseMetric {
  totalVolunteerHours: number;
  monthlyGrowth: number;
  activeVolunteers: number;
  volunteerGrowth: number;
  retentionRate: number;
  averageHoursPerVolunteer?: number;
}

// Investor & Analytics Data
export interface InvestorMetrics extends BaseMetric {
  totalCirculation: number;
  activeCirculation: number;
  avgBusinessSpend: number;
  creditsEarned: number;
  monthlyGrowth: number;
  retentionRate: number;
  roi?: number;
  socialImpactScore?: number;
}

export interface EngagementMetrics extends BaseMetric {
  activeVolunteersPercent: number;
  averageSessionLength: number;
  returnRate: number;
  completionRate: number;
  satisfactionScore: number;
}

export interface ImpactMetrics extends BaseMetric {
  economicValue: number;
  socialReturn: number;
  environmentalImpact: string;
  communityBenefit: string;
  sustainabilityScore: number;
}

export interface BusinessSector {
  id: string; // Unique identifier
  name: "Local Retail" | "Food Services" | "Professional" | "Health & Wellness" | "Education" | "Other"; // Sector names
  value: number; // Number of businesses in this sector
}

