'use client';

import React from 'react';
import { KeyMetricsCard } from './components/KeyMetricsCard';
import { BusinessNetworkCard } from './components/BusinessNetworkCard';
import { businessSectors, investorMetrics } from '@/data/sampleData';

const InvestorOverviewPage = () => {
  return (
      <div className="space-y-6 p-6">
        <KeyMetricsCard 
          totalCirculation={investorMetrics.totalCirculation}
          activeCirculation={investorMetrics.activeCirculation}
          avgBusinessSpend={investorMetrics.avgBusinessSpend}
        />
        
        <BusinessNetworkCard 
          sectors={businessSectors}
        />
      </div>
    
  );
};

export default InvestorOverviewPage;