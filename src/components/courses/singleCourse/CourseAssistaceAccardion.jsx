import {getAllAssistance} from '@core/services/api/assistance'
import {useQuery} from '@tanstack/react-query'
import {useState} from 'react'
import {useParams} from 'react-router-dom'
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
} from 'reactstrap'
import {AssistanceWorkTable} from '../assistance-work/AssistanceWorkTable'
import {convertGrigorianDateToJalaali} from '@core/utils/formatter.utils'
import {Edit} from 'react-feather'
import {CreateAssistanceModal} from '../assistence/CreateAssistanceModal'

export function CourseAssistaceAccardion({course}) {
    const {id} = useParams()
    const [showEdit, setShowEdit] = useState({currentAssistance: null, show: false})
    const [showEdit2, setShowEdit2] = useState({currentAssistance: null, show: false})
    const [open, setOpen] = useState('')

    const toggle = id => {
        open === id ? setOpen() : setOpen(id)
    }

    let {data: assistance} = useQuery({
        queryKey: ['all-assistance-list'],
        queryFn: getAllAssistance,
    })

    assistance = assistance?.filter(item => item.courseId === id) || []

    function handleModalOpen(event, assistance) {
        event.stopPropagation()
        setShowEdit({
            currentAssistance: assistance,
            show: true,
            isEdit: assistance?.courseId ? true : false,
        })
    }

    function handleModalOpen2() {
        setShowEdit2({
            currentAssistance: null,
            show: true,
            isEdit: false,
        })
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <Button
                        className="add-new-user ms-1"
                        color="warning"
                        onClick={handleModalOpen2}
                    >
                        {'تعیین دستیار جدید'}
                    </Button>
                </CardHeader>
                <CardBody>
                    <Accordion className="accordion-margin" open={open} toggle={toggle}>
                        {assistance.map((item, index) => (
                            <AccordionItem key={item.id}>
                                <AccordionHeader targetId={String(index + 1)}>
                                    <Row className="w-100 text-center">
                                        <Col>{item.assistanceName}</Col>
                                        <Col>
                                            انتصاب : {convertGrigorianDateToJalaali(item.inserDate)}
                                        </Col>
                                        <Col>
                                            <Button.Ripple
                                                tag="span"
                                                className="btn-icon z-100"
                                                color="warning"
                                                onClick={event => handleModalOpen(event, item)}
                                            >
                                                <Edit size={14} />
                                            </Button.Ripple>
                                        </Col>
                                    </Row>
                                </AccordionHeader>

                                <AccordionBody accordionId={String(index + 1)}>
                                    <AssistanceWorkTable
                                        user={{id: item.userId}}
                                        singleCourse={id}
                                        isCurrentUserAssistance={
                                            assistance?.filter(
                                                item1 => item1.userId === item.userId
                                            ) || []
                                        }
                                    />
                                </AccordionBody>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardBody>
            </Card>

            <CreateAssistanceModal
                key={showEdit.isEdit}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                singleUser={showEdit.currentAssistance}
            />
            <CreateAssistanceModal
                showEdit={showEdit2}
                setShowEdit={setShowEdit2}
                singleCourse={course}
            />
        </>
    )
}
