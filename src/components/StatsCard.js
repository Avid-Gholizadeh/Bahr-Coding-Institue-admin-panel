// ** Third Party Components
import classnames from 'classnames'
import { TrendingUp, User, Box, DollarSign, Users, BookOpen, Paperclip } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'
import { useQuery } from '@tanstack/react-query';
import {getLandingReport} from '../core/index'

const StatsCard = ({ cols }) => {
  const { data:report, isLoading } = useQuery({
    queryKey:['landing'],
    queryFn: getLandingReport,
  })
  const landingData = report || [];

  console.log(landingData);
  const data = [
    {
      title: landingData.teacherCount || 'N/A',
      subtitle: 'اساتید',
      color: 'light-primary',
      icon: <User size={24} />
    },
    {
      title: landingData.studentCount || 'N/A',
      subtitle: 'دانشجویان',
      color: 'light-info',
      icon: <Users size={24} />
    },
    {
      title: landingData.courseCount || 'N/A',
      subtitle: 'دوره ها',
      color: 'light-success',
      icon: <BookOpen size={24} />
    },
    {
      title: landingData.newsCount || 'N/A',
      subtitle: 'بلاگ ها',
      color: 'light-danger',
      icon: <Paperclip size={24} />
    }
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1
          })}
        >
          <div className='d-flex align-items-center'>
            <Avatar color={item.color} icon={item.icon} className='me-2' />
            <div className='my-auto'>
              <h4 className='fw-bolder mb-0'>{item.title}</h4>
              <CardText className='font-medium-1 mb-0 '>{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>Statistics</CardTitle>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
