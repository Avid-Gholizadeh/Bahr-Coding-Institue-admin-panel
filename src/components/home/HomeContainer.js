import { useState } from 'react';
import StatsCard from './StatsCard';
import BlogCourseStats from './BlogCourseStats';
import { useQuery } from '@tanstack/react-query';
import { getDashboardReport, getLandingReport } from '@core/services/api/dashboard.api';
import UserStatus from './UserStatus';
import { Col, Row } from 'reactstrap';
import AllPayments from './AllPayments';

const HomeContainer = () => {

    const { data: report, isLoading } = useQuery({
        queryKey: ['landing'],
        queryFn: getLandingReport,
      });
      const {data: dashReportData, isLoading:loadingDash} = useQuery({
        queryKey: ['dashboardReport'],
        queryFn:getDashboardReport,
      })
    
    return (
        <div>
            <StatsCard report={report} isLoading={isLoading} /> {/* Pass setStats to StatsCard */}
            <Row>
                <Col>
                    <UserStatus dashReportData={dashReportData} loadingDash={loadingDash} />
                </Col>
                <Col>
                    <AllPayments dashReportData={dashReportData}/>
                </Col>
            </Row>
            <BlogCourseStats report={report||{}} isLoading={isLoading} 
            dashReportData={dashReportData} loadingDash={loadingDash}/> {/* Pass stats to BlogCourseStats */}
        </div>
    );
};

export default HomeContainer;
