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
import courseLevelPic from '@src/assets/images/courseLevelPic.webp'
import {convertGrigorianDateToJalaali} from '@core/utils/formatter.utils'
import {Edit, Edit2, Edit3} from 'react-feather'

export function LevelsCard({Levels, handleModalOpen}) {
    return (
        <>
            <Card className="text-white border-0 cursor-pointer hover-scale">
                <CardImg top src={courseLevelPic} alt="card-overlay" className="card-img" />

                <CardImgOverlay className="bg-overlay">
                    <CardTitle className="fs-2 mb-2">{Levels.levelName}</CardTitle>

                    <hr className="text-white w-75" />

                    <div style={{position: 'absolute', bottom: 15, left: 15}}>
                        <Button.Ripple
                            className="btn-icon"
                            color="primary"
                            onClick={() => handleModalOpen(Levels)}
                        >
                            <Edit3 size={20} />
                        </Button.Ripple>
                    </div>
                </CardImgOverlay>
            </Card>
        </>
    )
}
