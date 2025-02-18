import {
  VolunteerActivity,
  Business,
  Achievement,
  ProgramImpact,
  TransactionRecord,
  InvestorMetrics,
  EngagementMetrics,
  ImpactMetrics,
  Volunteer,
  Address,
  EventRegistration,
  AppUsageMetrics,
} from '@/types/dataTypes';

// Sample Event Registrations
export const sampleEventRegistrations: EventRegistration[] = [
  {
    id: "reg-001",
    eventId: "act-001",
    volunteerId: "vol-001",
    status: "registered",
  },
  {
    id: "reg-002",
    eventId: "act-002",
    volunteerId: "vol-002",
    status: "registered",
  },
  {
    id: "reg-003",
    eventId: "act-001",
    volunteerId: "vol-002",
    status: "canceled",
  },
];

const calculateSpotsFilled = (eventId: string): number => {
  return sampleEventRegistrations.filter(
    (registration) => registration.eventId === eventId && registration.status === "registered"
  ).length;
};

// Sample Volunteers
export const sampleVolunteers: Volunteer[] = [
  {
    id: "vol-001",
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    joinDate: new Date("2024-01-01"),
    totalHours: 28,
    balance: 100,
    totalEarned: 200,
    totalSpent: 100,
    impactScore: 85,
    streak: 4,
  },
  {
    id: "vol-002",
    name: "Michael Rodriguez",
    email: "m.rodriguez@email.com",
    joinDate: new Date("2024-01-15"),
    totalHours: 24,
    balance: 50,
    totalEarned: 150,
    totalSpent: 100,
    impactScore: 82,
    streak: 3,
  },
];

// Sample Transactions
export const sampleTransactions: TransactionRecord[] = [
  {
    id: "txn-001",
    volunteerId: "vol-001",
    type: "earned",
    amount: 100,
    description: "Forest Park Trail Maintenance",
    date: new Date("2024-12-30"),
    hours: 4,
  },
  {
    id: "txn-002",
    volunteerId: "vol-002",
    type: "spent",
    amount: 50,
    description: "Rose City Coffee Co.",
    date: new Date("2024-12-29"),
    businessId: "biz-001",
    businessName: "Rose City Coffee Co.",
  },
];


// Sample Volunteer Activities (Events)
export const volunteerActivities: VolunteerActivity[] = [
  {
    id: "act-001",
    name: "Trail Maintenance & Native Plant Care",
    organization: "Forest Park Conservancy",
    category: "Environmental",
    hours: 4,
    date: new Date("2024-02-20"),
    time: "13:00",
    code: "VOL-2024-ABC123",
    impact: "Plant 50 native trees",
    address: {
      street: "4001 NW Cornell Rd",
      city: "Portland",
      state: "OR",
      postalCode: "97210",
    },
    description: "Help maintain Forest Park's extensive trail network and care for native plants.",
    supervisorName: "Mike Chen",
    supervisorEmail: "mchen@forestpark.org",
    spots_total: 20, 
    credits: 100,
    spots_filled: calculateSpotsFilled("act-001"), // Dynamically calculated
  },
  {
    id: "act-002",
    name: "Food Box Distribution",
    organization: "Oregon Food Bank",
    category: "Food Security",
    hours: 3,
    date: new Date("2024-02-22"),
    time: "13:00",
    code: "VOL-2024-DEF456",
    impact: "Distribute food to 100 families",
    address: {
      street: "7900 NE 33rd Drive",
      city: "Portland",
      state: "OR",
      postalCode: "97211",
    },
    description: "Support our weekly food box distribution program.",
    supervisorName: "Sarah Johnson",
    supervisorEmail: "sarah@oregonfoodbank.org",
    spots_total: 15, 
    credits: 75,
    spots_filled: calculateSpotsFilled("act-002"), // Dynamically calculated
  },
  {
    id: "act-003",
    code: "VOL-2024-GHI789",
    name: "Community Garden Cleanup",
    organization: "Portland Green Spaces",
    category: "Community Service",
    hours: 2,
    date: new Date("2024-03-20"),
    time: "10:30 AM",
    description: "Join us in cleaning and maintaining our community gardens.",
    impact: "Revitalize local green spaces",
    supervisorName: "Emma Lee",
    supervisorEmail: "emma@greenspaces.org",
    address: {
      street: "600 SE Grand Ave",
      city: "Portland",
      state: "OR",
      postalCode: "97214",
    },
    credits: 50,
    spots_total: 10,
    spots_filled: 3,
  },
];

// Sample Businesses
export const businesses: Business[] = [
  {
    id: "biz-001",
    name: "Rose City Coffee Co.",
    phone: "(503) 555-0123",
    address: {
      street: "123 SE Division St",
      city: "Portland",
      state: "OR",
      postalCode: "97202",
    },
    category: "Food & Drink",
    credits: 50,
    description: "Locally roasted coffee and fresh pastries",
    emoji: "☕",
    tags: ["Coffee", "Breakfast", "Local"],
    website: "www.rosecitycoffee.com",
    email: "hello@rosecitycoffee.com",
    active: true,
    rewards: "Free coffee or tea with 50 credits",
  },
];

// Sample Achievements
export const achievements: Achievement[] = [
  {
    id: "ach-001",
    name: "First Timer",
    description: "Complete your first volunteer event",
    icon: "🌟",
    earned: true,
    progress: 100,
  },
  {
    id: "ach-002", 
    name: "Environmental Hero", 
    description: "Complete 5 environmental service projects", 
    icon: "🌳", 
    earned: true, 
    progress: 100 
  },
  {
    id: "ach-003", 
    name: "Community Champion", 
    description: "Volunteer 50+ hours in a year", 
    icon: "🏆", 
    earned: false, 
    progress: 80 
  },
];

// Sample Program Impact Data
export const programImpact: ProgramImpact = {
  totalVolunteerHours: 1250,
  monthlyGrowth: 15,
  activeVolunteers: 24,
  volunteerGrowth: 3,
  retentionRate: 89,
  averageHoursPerVolunteer: 52,
};

// Sample Investor Metrics
export const investorMetrics: InvestorMetrics = {
  totalCirculation: 250000,
  activeCirculation: 75000,
  avgBusinessSpend: 2500,
  monthlyGrowth: 15,
  retentionRate: 85,
  roi: 2.5,
  socialImpactScore: 92,
  creditsEarned: 45000,
};

// Sample Engagement Metrics
export const engagementMetrics: EngagementMetrics = {
  activeVolunteersPercent: 78,
  averageSessionLength: 45,
  returnRate: 85,
  completionRate: 92,
  satisfactionScore: 4.6,
};

// Sample Impact Metrics
export const impactMetrics: ImpactMetrics = {
  economicValue: 450000,
  socialReturn: 3.2,
  environmentalImpact: "12.5 tons CO2 reduced",
  communityBenefit: "15,000 people served",
  sustainabilityScore: 88,
};

export const appUsageMetrics: AppUsageMetrics = {
  totalUsers: 1250,
  activeUsers: 800,
  totalEvents: 320,
  totalHours: 14000,
  totalCredits: 5200,
  totalBusinesses: 50,
  totalVolunteers: 900
};

