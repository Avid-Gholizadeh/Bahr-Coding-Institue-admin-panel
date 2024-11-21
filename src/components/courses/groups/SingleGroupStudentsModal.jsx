import {useSelector} from 'react-redux'
import {
    Button,
    Card,
    Col,
    Form,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    Spinner,
} from 'reactstrap'
import {StudentsTable} from '../singleCourse/StudentsTable'
import {useCallback, useState} from 'react'

export function SingleGroupStudentsModal({handleToggleModal, show, group}) {
    const [studentCount, setStudentCount] = useState(false)
    // const {skin} = useSelector(state => state.layout)

    const handleSetCount = useCallback(number => setStudentCount(number), [])

    return (
        <>
            <Modal
                isOpen={show}
                toggle={handleToggleModal}
                backdrop="static"
                className="modal-dialog-centered modal-xl "
            >
                <ModalHeader className="bg-transparent" toggle={handleToggleModal}></ModalHeader>
                <ModalBody className="px-sm-5 mx-50">
                    <Card
                        className="p-2"
                        // style={{backgroundColor: skin === 'dark' ? 'auto' : '#eee'}}
                    >
                        <Row className="align-items-center flex-column gap-4 gap-lg-0 justify-content-center flex-lg-row">
                            <Col className="d-flex gap-3 align-items-baseline ">
                                <span className="fs-4 me-5"> نام گروه : {group?.groupName}‌</span>
                                <span className="fs-4"> تعداد اعضا : {studentCount}‌</span>
                            </Col>
                            {/* <Col className="d-flex align-items-center justify-content-lg-end gap-2 "></Col> */}
                        </Row>
                    </Card>

                    <StudentsTable singleGroup={group} onSetCount={handleSetCount} />
                </ModalBody>
            </Modal>
        </>
    )
}
