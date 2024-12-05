import {
    Card,
    CardImg,
    CardTitle,
    CardImgOverlay,
    Button,
    CardText,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,

} from 'reactstrap'
import semesterCardBg from '@src/assets/images/semesterCardBg.webp'
import { Edit3} from 'react-feather'
import { convertGrigorianDateToJalaali3 } from '@core/utils/formatter.utils'
import { useState } from 'react';
import { createPortal } from 'react-dom';
import CloseModal from './CloseModal';

export function TermCard({term, handleOpenModal}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isCloseModalOpen, setCloseModalOpen] = useState(false);
    const [editCloseModal, setEditCloseModal] = useState(false);


    const toggleDropdown = () => {
        setDropdownOpen((prevState) => !prevState);
      };
    const PortalDropdownMenu = ({ children }) => {
        return createPortal(children, document.getElementById('portal-root'));
      };
    return (
        <>
            <Card className="text-white border-0 cursor-pointer hover-scale">
                <CardImg top src={semesterCardBg} alt="card-overlay" className="card-img" style={{height:'250px'}} />

                <CardImgOverlay className="bg-overlay">
                    <CardTitle className="fs-2 mb-2">{term?.termName}</CardTitle>
                    <CardText className='fs-3'> {term?.departmentName} </CardText>
                    <CardText> آغاز: {' '} {convertGrigorianDateToJalaali3(term?.startDate)} </CardText>
                    <CardText> پایان: {' '} {convertGrigorianDateToJalaali3(term?.endDate)} </CardText>
                    <hr className="text-white w-75" />
                    <CardText className='fs-3'> {term?.expire? 'در حال اجرا':'منقضی'} </CardText>

                    <div className='d-flex gap-1' style={{position: 'absolute', bottom: 15, left: 15}}>
                        <Button.Ripple
                            className="btn-icon"
                            color="primary"
                            onClick={() => handleOpenModal(term)}
                        >
                            <Edit3 size={20} />
                        </Button.Ripple>
                        
                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                        <DropdownToggle
                            caret
                            className="btn-icon"
                            color="warning"
                        >
                            تعطیلی
                        </DropdownToggle>
                        <PortalDropdownMenu>
                        <DropdownMenu>
                            <DropdownItem
                            href='#' onClick={(e)=>{
                                e.preventDefault()
                                setCloseModalOpen(true)
                            }}>تعطیلی</DropdownItem>
                            <DropdownItem
                            href='#' onClick={(e)=>{
                                e.preventDefault()
                                setEditCloseModal(true)
                            }}> ویرایش تعطیلی</DropdownItem>
                        </DropdownMenu>
                        </PortalDropdownMenu>
                        </Dropdown>
                    </div>
                </CardImgOverlay>
            </Card>
            <CloseModal
            show={isCloseModalOpen}
            setShow={setCloseModalOpen}
            item={term}
            editCloseModal={null}
            />
            <CloseModal
            show={editCloseModal}
            setShow={setEditCloseModal}
            item={term}
            editCloseModal={true}
            />
        </>
    )
}
