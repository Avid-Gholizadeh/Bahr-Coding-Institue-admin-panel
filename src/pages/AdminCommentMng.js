import React from 'react'
import {CourseComment} from '../components/commentMng/CourseComment'
import {Card, CardBody} from 'reactstrap'
const AdminCommentMng = () => {
    return (
        <>
            <Card>
                <CardBody>
                    <h1 className="text-primary"> مدیریت کامنت‌ها</h1>
                </CardBody>
            </Card>
            <CourseComment />
        </>
    )
}

export default AdminCommentMng
