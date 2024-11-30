import React from 'react'
import { Col, Row, Spinner } from 'reactstrap'
import RadialBarChart from './RadialBarChart'
import { useQuery } from '@tanstack/react-query'
import { getCourseReport, getDashboardReport, getNewsReport } from '@core/services/api/dashboard.api'

const BlogCourseStats = ({ report, isLoading, dashReportData, loadingDash }) => {

  const { data: inActiveNewsCount, isLoading: loadingNewsCount, isError } = useQuery({
    queryKey: ['newsReport'], 
    queryFn: getNewsReport,
  });
  const {data:allCoursesCount, isLoading: loadingCourseCount} = useQuery({
    queryKey: ['courseReport'],
    queryFn: getCourseReport
  })

  const activeNewsCount = report.newsCount;
  const allNewsCount = inActiveNewsCount + activeNewsCount

  const activeNewsPercentage = Math.round((activeNewsCount / allNewsCount) * 100);

  const activeCourses = report.courseCount;
  const activeCoursePercentage = Math.round((activeCourses / allCoursesCount) * 100);
  

  return (
    <Row>
      <Col>
        {isLoading && loadingNewsCount ? <Spinner color="primary" size="lg" /> :
          <RadialBarChart activeNewsPercentage={activeNewsPercentage} 
          success="#f56c6c" header=' بلاگ های فعال' 
          allCount={allNewsCount} activeCount={activeNewsCount} 
          text='فعال:'
          />}
      </Col>
      <Col>
        {isLoading && loadingCourseCount ? <Spinner color="primary" size="lg" /> :
          <RadialBarChart activeNewsPercentage={activeCoursePercentage} 
          success="#f56c6c" header= 'کورس های فعال' 
          allCount={allCoursesCount} activeCount={activeCourses} 
          text='فعال:'
          />}
      </Col>
      <Col>
          {loadingDash? <Spinner color="primary" size="lg" />:
            <RadialBarChart activeNewsPercentage={Math.round(dashReportData.reserveAcceptPercent)} 
            success="#f56c6c" header=' پرداختی پذیرفته' 
            allCount={dashReportData.allReserve} activeCount={dashReportData.allReserveAccept} 
            text='پذیرفته:'
            />
          }
      </Col>
    </Row>
  );
}

export default BlogCourseStats;
