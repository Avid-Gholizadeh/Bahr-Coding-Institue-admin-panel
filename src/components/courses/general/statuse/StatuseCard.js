import React from 'react'
import { Edit3 } from 'react-feather'
import { Button, Card, CardImg, CardImgOverlay, CardText, CardTitle } from 'reactstrap'
import statusCardBg from '@src/assets/images/statusCardBg.webp'


export default function StatuseCard({status, handleOpenModal}) {
  return (
    <>
    <Card className="text-white border-0 cursor-pointer hover-scale">
        <CardImg top src={statusCardBg} alt="card-overlay" className="card-img" style={{height:'200px'}}/>

        <CardImgOverlay className="bg-overlay">
            <CardTitle className="fs-2 mb-2">{status.statusName}</CardTitle>

            <CardText className="fs-5">
                توضیحات:{' '}
                {status.describe}
            </CardText>

            <hr className="text-white w-75" />

            <div style={{position: 'absolute', bottom: 15, left: 15}}>
                <Button.Ripple
                    className="btn-icon"
                    color="primary"
                    onClick={() => handleOpenModal(status)}
                >
                    <Edit3 size={20} />
                </Button.Ripple>
            </div>
        </CardImgOverlay>
    </Card>
</>
  )
}
