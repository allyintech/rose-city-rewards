import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface KeyMetricsCardProps {
  totalCirculation: number;
  activeCirculation: number;
  avgBusinessSpend: number;
}

export const KeyMetricsCard = ({ 
  totalCirculation,
  activeCirculation,
  avgBusinessSpend
}: KeyMetricsCardProps) => {
  const metrics = [
    {
      icon: '$',
      label: 'Total Currency Circulated',
      value: totalCirculation,
    },
    {
      icon: '📈',
      label: 'Current Active Circulation',
      value: activeCirculation,
    },
    {
      icon: '🏢',
      label: 'Avg. Credits per Business',
      value: avgBusinessSpend,
    }
  ];

  return (
    <div className="space-y-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="text-red-600 text-2xl">{metric.icon}</div>
              <div className="flex-1">
                <p className="text-gray-600">{metric.label}</p>
                <p className="text-2xl font-bold">
                  ${metric.value.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
