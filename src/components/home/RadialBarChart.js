import React from "react";
import Chart from "react-apexcharts";
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from "reactstrap";

const RadialBarChart = ({ activeNewsPercentage, success, header, allCount, activeCount,text }) => {
  const options = {
    chart: {
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        blur: 3,
        left: 1,
        top: 1,
        opacity: 0.1
      }
    },
    colors: ['#51e5a8'],
    plotOptions: {
      radialBar: {
        offsetY: 10,
        startAngle: -150,
        endAngle: 150,
        hollow: {
          size: '77%'
        },
        track: {
          background: '#ebe9f1',
          strokeWidth: '50%'
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            color: '#5e5873',
            fontFamily: 'Montserrat',
            fontSize: '2.86rem',
            fontWeight: '600'
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: [success], // Pass success here directly
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    grid: {
      padding: {
        bottom: 30
      }
    }
  };
  const series = [activeNewsPercentage];

  return (
    <Card>
      <CardHeader className="m-auto h3">
        {header}
      </CardHeader>
      <CardBody className='p-0'>
        <Chart options={options} series={series} type='radialBar' height={245} />
      </CardBody>
      <CardFooter>
          <p className="h4 d-flex justify-content-evenly">
            <span>
              {text}
              {' '}
              {activeCount}
            </span>
            <span>
              کل:
              {' '}
              {allCount}
            </span>
          </p>
      </CardFooter>
    </Card>
  );
};

export default RadialBarChart;
