import {Button, Card, CardBody, Col, Label, Row} from 'reactstrap'
import '@styles/base/pages/app-ecommerce-details.scss'
import {getNewsCategoryList} from '@core/services/api/article'
import {useQuery} from '@tanstack/react-query'
import {useParams} from 'react-router-dom'
import CategoriesFallback from '@src/assets/images/categories-fallback.jpeg'
import {convertGrigorianDateToJalaali, isValidUrl} from '@core/utils/formatter.utils'
import Avatar from '@core/components/avatar'
import {Edit, PenTool} from 'react-feather'
import {useState} from 'react'
import {CreateCategoryModal} from './CreateCategoryModal'
import {AllArticlesTable} from '../AllArticlesTable'

export function CategoryDetails() {
    //
    const {id} = useParams()
    const [showEdit, setShowEdit] = useState({currentCategory: null, show: false, isEdit: false})

    let {data: articleCategories, isLoading} = useQuery({
        queryKey: ['news-category-list'],
        queryFn: getNewsCategoryList,
    })

    const category = articleCategories?.find(category => category.id === +id) || null

    const renderCourseAvatar = row => {
        return (
            <Avatar
                className="me-1 overflow-hidden"
                img={isValidUrl(row.iconAddress) ? row.iconAddress : CategoriesFallback}
                size="lg"
            />
        )
    }

    function handleModalOpen(category) {
        setShowEdit({
            currentCategory: category,
            show: true,
            isEdit: category.iconAddress ? true : false,
        })
    }

    return (
        <>
            {category && (
                <div>
                    <Card>
                        <CardBody>
                            <Row className="my-2">
                                <Col
                                    className="d-flex align-items-center justify-content-center mb-2 mb-md-0"
                                    md="5"
                                    xs="12"
                                >
                                    <div className="d-flex align-items-center justify-content-center  h-100">
                                        <img
                                            className="img-fluid product-img rounded-3 h-100"
                                            style={{objectFit: 'cover'}}
                                            src={
                                                isValidUrl(category.image)
                                                    ? category.image
                                                    : CategoriesFallback
                                            }
                                            alt={category.categoryName}
                                        />
                                    </div>
                                </Col>

                                <Col md="7" xs="12" className="d-flex flex-column gap-2">
                                    <h3> نام دسته‌بندی : {category.categoryName}</h3>

                                    <hr />

                                    <div className="d-flex align-items-center ">
                                        {renderCourseAvatar(category)}

                                        <p
                                            className="text-body mb-0 pe-2 me-2"
                                            style={{
                                                borderLeft: '2px solid #ccc',
                                            }}
                                        >
                                            <span className="fs-5">{category.iconName}</span>
                                        </p>

                                        <span>
                                            {convertGrigorianDateToJalaali(category.insertDate)}
                                        </span>
                                    </div>

                                    <div>
                                        <Label className="form-label fs-5"> عنوان گوگل :</Label>
                                        <p className="ms-2" style={{marginTop: '5px'}}>
                                            {category.googleTitle}
                                        </p>
                                    </div>

                                    <div style={{marginTop: -15}}>
                                        <Label className="form-label fs-5"> توضیح گوگل :</Label>
                                        <p className="ms-2" style={{marginTop: '5px'}}>
                                            {category.googleDescribe}
                                        </p>
                                    </div>

                                    <hr />

                                    <Button
                                        className="me-0 me-sm-1 mb-1 mb-sm-0"
                                        style={{width: 150}}
                                        color="primary"
                                        onClick={() => handleModalOpen(category)}
                                    >
                                        ویرایش
                                        <Edit className="ms-75" size={16} />
                                    </Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                    <AllArticlesTable singleCategoryId={category.id} />
                </div>
            )}

            <CreateCategoryModal
                key={showEdit.isEdit}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
            />
        </>
    )
}
