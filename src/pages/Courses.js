import React from 'react'
import {Card, CardBody} from 'reactstrap'
import {Table} from '../Components/courses/Table'

const Courses = () => {
    return (
        <>
            <Card>
                <CardBody>
                    <h1 className="text-primary">دوره ها</h1>
                </CardBody>
            </Card>
            <Table />
        </>
    )
}

export default Courses
