import {Card, CardImg, CardTitle, CardImgOverlay, CardText, Button} from 'reactstrap'
import classRoogBg from '@src/assets/images/classRoom-bg.jpg'
import {convertGrigorianDateToJalaali} from '@core/utils/formatter.utils'
import {Edit3} from 'react-feather'

export function ClassRoomCard({classRoom, handleModalOpen}) {
    return (
        <>
            <Card className="text-white border-0 cursor-pointer hover-scale">
                <CardImg
                    top
                    src={classRoogBg}
                    alt="card-overlay"
                    className="card-img"
                    height={250}
                    style={{filter: 'brightness(0.7)'}}
                />

                <CardImgOverlay className="bg-overlay">
                    <CardTitle className="fs-2 mb-2">{classRoom.classRoomName}</CardTitle>

                    <CardText className="fs-5 d-flex flex-column gap-1">
                        <span>ساختمان : {classRoom.buildingName}</span>
                        <span>ظرفیت : {classRoom.capacity}</span>
                        <span>
                            تاریخ ساخت : {convertGrigorianDateToJalaali(classRoom.insertDate)}
                        </span>
                    </CardText>

                    <hr className="text-white w-75" />

                    <div style={{position: 'absolute', bottom: 15, left: 15}}>
                        <Button.Ripple
                            className="btn-icon"
                            color="primary"
                            onClick={() => handleModalOpen(classRoom)}
                        >
                            <Edit3 size={16} />
                        </Button.Ripple>
                    </div>
                </CardImgOverlay>
            </Card>
        </>
    )
}
