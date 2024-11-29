import {useQuery} from '@tanstack/react-query'
import {useParams} from 'react-router-dom'
import {Alert, Col, Row, Spinner} from 'reactstrap'
import {Link} from 'react-feather'
import {useState} from 'react'
import {Tabs} from './Tabs'
import {getNewsById} from '@core/services/api/article'
import {ArticleCardInfo} from './ArticleCardInfo'

export function SingleArticle() {
    const {id} = useParams()
    const [active, setActive] = useState('1')

    function toggleTab(tab) {
        if (active !== tab) {
            setActive(tab)
        }
    }

    const {data: article, isLoading} = useQuery({
        queryKey: ['single-article', id],
        queryFn: () => getNewsById(id),
    })

    // console.log(article)

    if (isLoading) {
        return (
            <div className="text-center mt-5">
                <Spinner color="primary" className="mx-auto" />
            </div>
        )
    }

    return article !== null && article !== undefined ? (
        <div className="app-user-view">
            <Row>
                <Col xl="4" lg="5" xs={{order: 1}} md={{order: 0, size: 5}}>
                    <ArticleCardInfo article={article.detailsNewsDto} articleId={id} />
                </Col>
                <Col xl="8" lg="7" xs={{order: 0}} md={{order: 1, size: 7}}>
                    <Tabs
                        active={active}
                        toggleTab={toggleTab}
                        singleCourseId={id}
                        singleArticle={article.detailsNewsDto}
                    />
                </Col>
            </Row>
        </div>
    ) : (
        <Alert color="danger">
            <h4 className="alert-heading">مقاله پیدا نشد</h4>
            <div className="alert-body">
                مقاله با آیدی مورد نظر پیدا نشد
                <Link to="/all-articles">لیست مقالات</Link>
            </div>
        </Alert>
    )
}
