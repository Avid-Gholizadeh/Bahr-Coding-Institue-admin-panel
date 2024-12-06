import {AssistanceTable} from '@Components/courses/assistence/AssistanceTable'
import {Card, CardBody} from 'reactstrap'

export default function Assistance() {
    return (
        <>
            <Card>
                <CardBody>
                    <h1 className="text-primary"> دستیاران</h1>
                </CardBody>
            </Card>

            <AssistanceTable />
        </>
    )
}
