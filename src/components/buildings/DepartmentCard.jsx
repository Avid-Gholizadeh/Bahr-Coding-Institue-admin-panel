import {
    Card,
    CardImg,
    CardTitle,
    CardImgOverlay,
    CardText,
    Button,
    CardFooter,
    CardBody,
} from 'reactstrap'
import departmentBg from '@src/assets/images/department-bg.webp'
import {convertGrigorianDateToJalaali} from '@core/utils/formatter.utils'
import {Edit, Edit2, Edit3} from 'react-feather'

export function DepartmentCard({department, handleModalOpen}) {
    return (
        <>
            <Card className="text-white border-0 cursor-pointer hover-scale">
                <CardImg top src={departmentBg} alt="card-overlay" className="card-img" />

                <CardImgOverlay className="bg-overlay">
                    <CardTitle className="fs-2 mb-2">{department.depName}</CardTitle>
                    <CardText className="fs-5">
                        <span>
                            تاریخ انتشار : {convertGrigorianDateToJalaali(department.insertDate)}
                        </span>
                    </CardText>
                    <CardText className="fs-5 mt-1">
                        <span>ساختمان : {department.buildingName}</span>
                    </CardText>

                    <hr className="text-white w-75" />

                    <div style={{position: 'absolute', bottom: 15, left: 15}}>
                        <Button.Ripple
                            className="btn-icon"
                            color="primary"
                            onClick={() => handleModalOpen(department)}
                        >
                            <Edit3 size={20} />
                        </Button.Ripple>
                    </div>
                </CardImgOverlay>
            </Card>
        </>
    )
}
