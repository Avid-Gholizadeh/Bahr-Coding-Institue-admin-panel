import {Modal, ModalBody, ModalHeader} from 'reactstrap'
import {FormWizard} from './formWizard/FormWizard'
import {getNewsById} from '@core/services/api/article'
import {useQuery} from '@tanstack/react-query'

export function EditArticleModal({showEdit, setShowEdit, singleCategoryId}) {
    //
    const {data: singleArticle} = useQuery({
        enabled: Boolean(showEdit.currentArticleId),
        queryKey: ['single-article', showEdit.currentArticleId],
        queryFn: () => getNewsById(showEdit.currentArticleId),
    })

    return (
        <>
            <Modal
                isOpen={showEdit.show}
                toggle={() => setShowEdit({currentArticleId: null, show: false})}
                backdrop="static"
                className="modal-dialog-centered modal-xl "
            >
                <ModalHeader
                    className="bg-transparent"
                    toggle={() => setShowEdit({currentArticleId: null, show: false})}
                ></ModalHeader>
                <ModalBody className="px-sm-5 mx-50" style={{paddingBottom: 100}}>
                    <FormWizard
                        key={Boolean(singleArticle)}
                        isEdit={Boolean(singleArticle)}
                        articleData={singleArticle?.detailsNewsDto}
                        setShow={() => setShowEdit({currentArticleId: null, show: false})}
                        singleCategoryId={singleCategoryId}
                    />
                </ModalBody>
            </Modal>
        </>
    )
}
