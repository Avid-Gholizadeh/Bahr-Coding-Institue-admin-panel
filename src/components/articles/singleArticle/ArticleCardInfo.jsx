import {Eye, MessageCircle, Star} from 'react-feather'
import {Badge, Button, Card, CardBody, Modal, ModalBody, ModalHeader, Spinner} from 'reactstrap'
import {isValidUrl} from '../../../@core/utils/formatter.utils'
import {useState} from 'react'
import {FormWizard} from '../formWizard/FormWizard'
import {useMutation} from '@tanstack/react-query'
import toast from 'react-hot-toast'
import ArticleFallback from '../../../assets/images/article-fallback.jpg'
import {Link, useNavigate} from 'react-router-dom'
import {EditArticleModal} from '../EditArticleModal'
import {activeDeactiveArticle} from '@core/services/api/article'

export function ArticleCardInfo({article, articleId}) {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [showEdit, setShowEdit] = useState({currentArticleId: articleId, show: false})

    const {mutate: activeDeactiveMutate, isPending} = useMutation({
        mutationFn: activeDeactiveArticle,
        onSuccess: data => {
            if (data.success) {
                toast.success('خبر با موفقیت فعال شد')
                navigate('/all-articles')
            } else {
                toast.error(data.message)
            }
        },
        onError: err => {
            toast.error(err.message)
        },
    })

    function handleActiveState() {
        activeDeactiveMutate({Active: !article.active, Id: articleId})
    }

    function handleArticleEdit() {
        setShowEdit(prevS => ({currentArticleId: articleId, show: !prevS.show}))
    }

    const renderArticleImage = () => {
        return (
            <div className="rounded-3 overflow-hidden mb-2" style={{width: '90%', height: 200}}>
                <img
                    height="100%"
                    width="100%"
                    alt="article-image"
                    src={
                        isValidUrl(article.currentImageAddressTumb)
                            ? article.currentImageAddressTumb
                            : ArticleFallback
                    }
                    className="img-cover"
                />
                {/* <PlusCircle /> */}
            </div>
        )
    }

    return (
        <>
            <Card>
                <CardBody>
                    <div className="user-avatar-section">
                        <div className="d-flex align-items-center flex-column">
                            {renderArticleImage()}
                            <div className="d-flex flex-column align-items-center text-center">
                                <div className="user-info">
                                    <h2 className="mb-1">{article.title}</h2>
                                    <Badge
                                        tag={Link}
                                        to={'/article-category/' + article.newsCatregoryId}
                                        color="light-success"
                                        className="rounded cursor-pointer fs-6 p-75"
                                    >
                                        {article.newsCatregoryName}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-around my-2 pt-75">
                        <div className="d-flex align-items-start me-2">
                            <Badge color="light-primary" className="rounded p-75">
                                <Star className="font-medium-2" />
                            </Badge>
                            <div className="ms-75">
                                <h4 className="mb-0">{article.currentRate}</h4>
                                <small>امتیاز</small>
                            </div>
                        </div>

                        <div className="d-flex align-items-start me-2">
                            <Badge color="light-primary" className="rounded p-75">
                                <Eye className="font-medium-2" />
                            </Badge>
                            <div className="ms-75">
                                <h4 className="mb-0">{article.currentView}</h4>
                                <small>بازدید</small>
                            </div>
                        </div>

                        <div className="d-flex align-items-start">
                            <Badge color="light-primary" className="rounded p-75">
                                <MessageCircle className="font-medium-2 " />
                            </Badge>
                            <div className="ms-75">
                                <h4 className="mb-0">{article.commentsCount}</h4>
                                <small>کامنت </small>
                            </div>
                        </div>
                    </div>

                    <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات</h4>

                    <div className="info-container">
                        <ul className="list-unstyled">
                            <li className="mb-75">
                                <span className="fw-bolder me-75">نام خبر:</span>
                                <span>{article.title}</span>
                            </li>

                            <li className="mb-75">
                                <span className="fw-bolder me-75">وضعیت:</span>
                                <Badge
                                    className="text-capitalize"
                                    color={article.active ? 'success' : 'danger'}
                                >
                                    {article.active ? 'فعال' : 'غیرفعال'}
                                </Badge>
                            </li>

                            <li className="mb-75">
                                <span className="fw-bolder me-75">نام نویسنده:</span>
                                <Link
                                    to={`/user/view/${article.userId}`}
                                    className="text-capitalize"
                                >
                                    {article.addUserFullName}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex justify-content-center pt-2">
                        <Button color="primary" onClick={handleArticleEdit}>
                            ویرایش
                        </Button>

                        <Button
                            className="ms-1"
                            color={article.active ? 'warning' : 'success'}
                            outline
                            onClick={handleActiveState}
                            disabled={isPending}
                        >
                            {article.active ? 'غیر فعال ' : 'فعال '}
                            {isPending && <Spinner className="ms-1" size="sm" color={'warning'} />}
                        </Button>
                    </div>
                </CardBody>
            </Card>

            <Modal
                isOpen={show}
                toggle={() => setShow(!show)}
                backdrop="static"
                className="modal-dialog-centered modal-xl "
            >
                <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}></ModalHeader>
                <ModalBody className="px-sm-5 mx-50" style={{paddingBottom: 100}}>
                    <FormWizard
                        isEdit
                        courseData={article}
                        setShow={() => setShow(prevS => !prevS)}
                    />
                </ModalBody>
            </Modal>

            <EditArticleModal showEdit={showEdit} setShowEdit={setShowEdit} />
        </>
    )
}
