import {AllArticlesTable} from '@Components/articles/AllArticlesTable'
import {Card, CardBody} from 'reactstrap'

export default function AllArticles() {
    return (
        <>
            <Card>
                <CardBody>
                    <h1 className="text-primary"> اخبار و مقالات </h1>
                </CardBody>
            </Card>
            <AllArticlesTable />
        </>
    )
}
