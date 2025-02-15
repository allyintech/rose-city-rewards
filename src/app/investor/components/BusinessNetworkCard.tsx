import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { BusinessSector } from '@/types/dataTypes';
import { appUsageMetrics } from '@/data/sampleData';

interface BusinessNetworkCardProps {
  sectors: BusinessSector[];
}

type SectorName = 'Local Retail' | 'Food Services' | 'Professional' | 'Health & Wellness' | 'Education' | 'Other';

const sectorColors: Record<SectorName, string> = {
  'Local Retail': '#4F46E5',
  'Food Services': '#059669',
  'Professional': '#F97316',
  'Health & Wellness': '#7C3AED',
  'Education': '#EC4899',
  'Other': '#A9A9A9'
};

export const BusinessNetworkCard: React.FC<BusinessNetworkCardProps> = ({ sectors }) => {
  const coloredSectors = sectors.map(sector => ({
    ...sector,
    color: (sectorColors[sector.name as SectorName] ?? '#CBD5E1')
  }));

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-xl">Business Network</CardTitle>
        <CardDescription>
          Distribution of {appUsageMetrics.totalBusinesses} participating businesses across sectors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={coloredSectors}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={85}
                labelLine={false}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {coloredSectors.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                wrapperStyle={{
                  paddingLeft: "20px"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};