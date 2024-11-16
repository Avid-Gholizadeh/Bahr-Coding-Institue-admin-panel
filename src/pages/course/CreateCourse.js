import {FormWizard} from '@Components/courses/formWizard/FormWizard'
import {Card, CardBody} from 'reactstrap'

export default function CreateCourse() {
    return (
        <>
            <Card>
                <CardBody>
                    <h1 className="text-primary">ایجاد دوره</h1>
                </CardBody>
            </Card>
            <FormWizard />
        </>
    )
}
