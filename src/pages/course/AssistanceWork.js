import {AssistanceWorkTable} from '@Components/courses/assistance-work/AssistanceWorkTable'
import {Card, CardBody} from 'reactstrap'

export default function AssistanceWork() {
    return (
        <>
            <Card>
                <CardBody>
                    <h1 className="text-primary"> وظایف دستیاران</h1>
                </CardBody>
            </Card>

            <AssistanceWorkTable />
        </>
    )
}
