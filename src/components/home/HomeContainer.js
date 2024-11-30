import { useState } from 'react';
import StatsCard from './StatsCard';
import BlogCourseStats from './BlogCourseStats';
import { useQuery } from '@tanstack/react-query';
import { getLandingReport } from '@core/services/api/dashboard.api';

const HomeContainer = () => {

    const { data: report, isLoading } = useQuery({
        queryKey: ['landing'],
        queryFn: getLandingReport,
      });
    
    return (
        <div>
            <StatsCard report={report} isLoading={isLoading} /> {/* Pass setStats to StatsCard */}
            <BlogCourseStats report={report||{}} isLoading={isLoading} /> {/* Pass stats to BlogCourseStats */}
        </div>
    );
};

export default HomeContainer;
