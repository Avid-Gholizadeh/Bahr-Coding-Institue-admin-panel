import {GroupsTable} from '@Components/courses/groups/GroupsTable'
import {Card, CardBody} from 'reactstrap'

export default function AllGroups() {
    return (
        <>
            <Card>
                <CardBody>
                    <h1 className="text-primary">گروه ها</h1>
                </CardBody>
            </Card>
            <GroupsTable />
        </>
    )
}
