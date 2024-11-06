import React from 'react'
import {Card, CardBody} from 'reactstrap'
import {Table} from '../Components/courses/Table'

const Sample = () => {
    return (
        <>
            {' '}
            <Card>
                <CardBody>
                    <h1>دوره ها</h1>
                </CardBody>
            </Card>
            <Table />
        </>
    )
}

export default Sample
