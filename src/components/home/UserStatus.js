import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import Chart from 'react-apexcharts'
import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Spinner,
} from 'reactstrap'

function UserStatus({dashReportData, loadingDash}) {
    const [data, setData] = useState({
        listData: []
      });
    
      // Populate listData using dashReportData
      useEffect(() => {
        if (dashReportData) {
          const { allUser, inCompeletUserCount, deactiveUsers } = dashReportData;
      
          // Calculate complete users
          const completeUser = allUser - (Number(inCompeletUserCount) + Number(deactiveUsers));
          // Update state
          setData({
            listData: [
              { icon: 'User', text: 'پروفایل تکمیل شده', result: completeUser, color: 'text-success' },
              { icon: 'UserCheck', text: 'پروفایل تکمیل نشده', result: inCompeletUserCount, color: 'text-warning' },
              { icon: 'UserX', text: 'غیر فعال', result: deactiveUsers, color: 'text-danger' }
            ]
          });
        }
      }, [dashReportData]);
      

  const options = {
    chart: {
      toolbar: {
        show: false
      }
    },
    labels: data.listData.map(item => item.text),
    dataLabels: {
      enabled: false
    },
    legend: { show: false },
    stroke: {
      width: 2
    },
    colors: ['#28c76f', '#ffc107', '#ea5455']
  }

  const series = data.listData.map(item => parseInt(item.result))

  const renderChartInfo = () => {
    return data.listData.map((item, index) => {
      return (
        <div
          key={index}
          className={classnames('d-flex justify-content-between', {
            'mb-1': index !== data.listData.length - 1
          })}
        >
          <div className='d-flex align-items-center'>
            <span className={classnames('fw-bold', item.color)} style={{ marginRight: '8px' }}>
              ●
            </span>
            <span className='fw-bold'>{item.text}</span>
          </div>
          <span>{item.result}</span>
        </div>
      )
    })
  }

  return (
    <Card>
      <CardHeader className='align-items-end'>
        <CardTitle tag='h4'>وضعیت کاربران</CardTitle>
      </CardHeader>
      <CardBody>
        {loadingDash?<Spinner color="primary" size="lg" type="grow" />:
        <>
          <Chart options={options} series={series} type="pie" height={250} />
          <div className="pt-25">{renderChartInfo()}</div>
        </>
         }
      </CardBody>
    </Card>
  )
}

export default UserStatus
