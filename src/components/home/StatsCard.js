import classnames from 'classnames'
import {User, Users, BookOpen, Paperclip} from 'react-feather'
import Avatar from '@components/avatar'
import {Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Spinner} from 'reactstrap'
import {useQuery} from '@tanstack/react-query'
import {getLandingReport} from '@core/services/api/dashboard.api'
import {useEffect} from 'react'

const StatsCard = ({cols = {xs: 10, sm: 4, md: 3}, report, isLoading}) => {
    // Ensure report is defined and fallback to default values
    const defaultReport = {teacherCount: 0, studentCount: 0, courseCount: 0, newsCount: 0}
    const safeReport = report || defaultReport

    const data = [
        {
            title: safeReport.teacherCount,
            subtitle: 'اساتید',
            color: 'light-primary',
            icon: <User size={24} />,
        },
        {
            title: safeReport.studentCount,
            subtitle: 'دانشجویان',
            color: 'light-info',
            icon: <Users size={24} />,
        },
        {
            title: safeReport.courseCount,
            subtitle: 'دوره ها',
            color: 'light-success',
            icon: <BookOpen size={24} />,
        },
        {
            title: safeReport.newsCount,
            subtitle: 'بلاگ ها',
            color: 'light-danger',
            icon: <Paperclip size={24} />,
        },
    ]

    const renderData = () => {
        return data.map((item, index) => {
            const colMargin = cols ? Object.keys(cols) : []
            const margin = index === 2 ? 'sm' : colMargin[0] || 'sm' // Fallback to 'sm' if cols is empty
            return (
                <Col
                    key={index}
                    {...cols}
                    className={classnames({
                        [`mb-2 mb-${margin}-0`]: index !== data.length - 1,
                    })}
                >
                    <div className="d-flex align-items-center">
                        <Avatar color={item.color} icon={item.icon} className="me-2" />
                        <div className="my-auto">
                            {isLoading ? (
                                <Spinner color="primary" size="sm" type="grow" />
                            ) : (
                                <h4 className="fw-bolder mb-0">{item.title}</h4>
                            )}
                            <CardText className="font-medium-1 mb-0">{item.subtitle}</CardText>
                        </div>
                    </div>
                </Col>
            )
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h4">{'آمار کلی سایت : '}</CardTitle>
            </CardHeader>
            <CardBody className="statistics-body">
                <Row>{renderData()}</Row>
            </CardBody>
        </Card>
    )
}

export default StatsCard
