import {ReserveTable} from '@Components/courses/reserve/ReserveTable'
import {Card, CardBody} from 'reactstrap'

export default function AllReserves() {
    return (
        <>
            <Card>
                <CardBody>
                    <h1 className="text-primary">رزرو ها</h1>
                </CardBody>
            </Card>
            <ReserveTable />
        </>
    )
}
