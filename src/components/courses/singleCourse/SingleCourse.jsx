import {useQuery} from '@tanstack/react-query'
import {useParams} from 'react-router-dom'
import {getCourseByIdAdmin} from '../../../@core/services/api/courses'
import {Alert, Col, Row, Spinner} from 'reactstrap'
import {Link} from 'react-feather'
import {CourseInfoCard} from './social-groups/CourseInfoCard'
import {useState} from 'react'
import {Tabs} from './Tabs'

export function SingleCourse() {
    const {id} = useParams()
    const [active, setActive] = useState('1')

    function toggleTab(tab) {
        if (active !== tab) {
            setActive(tab)
        }
    }

    const {data: course, isLoading} = useQuery({
        queryKey: ['single-course', id],
        queryFn: () => getCourseByIdAdmin(id),
    })

    // console.log(course)

    if (isLoading) {
        return (
            <div className="text-center mt-5">
                <Spinner color="primary" className="mx-auto" />
            </div>
        )
    }

    return course !== null && course !== undefined ? (
        <div className="app-user-view">
            <Row>
                <Col xl="4" lg="5" xs={{order: 1}} md={{order: 0, size: 5}}>
                    <CourseInfoCard course={course} />
                </Col>
                <Col xl="8" lg="7" xs={{order: 0}} md={{order: 1, size: 7}}>
                    <Tabs
                        active={active}
                        toggleTab={toggleTab}
                        singleCourseId={id}
                        course={course}
                    />
                </Col>
            </Row>
        </div>
    ) : (
        <Alert color="danger">
            <h4 className="alert-heading">Course not found</h4>
            <div className="alert-body">
                Course with id: {id} doesn't exist. Check list of all courses:{' '}
                <Link to="/courses">Courses List</Link>
            </div>
        </Alert>
    )
}
