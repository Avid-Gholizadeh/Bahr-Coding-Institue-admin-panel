import {CategoriesTable} from '@Components/articles/articleCategory/CategoriesTable'
import {Card, CardBody} from 'reactstrap'

export default function ArticleCategories() {
    return (
        <>
            <Card>
                <CardBody>
                    <h1 className="text-primary"> دسته بندی ها </h1>
                </CardBody>
            </Card>
            <CategoriesTable />
        </>
    )
}
