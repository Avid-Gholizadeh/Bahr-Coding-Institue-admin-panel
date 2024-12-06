import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

const DeleteUserModal = ({isOpen, toggle, onDelete, userId}) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered">
            <ModalHeader toggle={toggle}>تایید حذف کاربر</ModalHeader>
            <ModalBody>از حذف کاربر به شناسه {userId} مطمئنید؟</ModalBody>
            <ModalFooter className="m-auto">
                <Button color="primary" onClick={() => onDelete(userId)}>
                    بله
                </Button>
                <Button color="secondary" onClick={toggle}>
                    خیر
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default DeleteUserModal
