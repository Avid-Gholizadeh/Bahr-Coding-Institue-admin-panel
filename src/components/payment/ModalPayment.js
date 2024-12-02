import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

export function ModalPayment({centeredModal,setCenteredModal,modalData}) {
    console.log('modalData:',modalData);
  return (
    <div className='vertically-centered-modal'>
    <Modal isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered'>
      <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>جزئیات بیشتر</ModalHeader>
      <ModalBody>
        <div className='d-flex flex-column justify-content-center gap-2'>
          <img src={modalData?.paymentInvoiceImage} alt='detail pic' style={{width:'350px', height: '350px', margin:'auto'}}/>
          <span className='m-auto fs-4'>
              کد فاکتور پرداخت:
              {' '}
              {modalData?.paymentInvoiceNumber}
          </span>
        </div>
      </ModalBody>
    </Modal>
  </div>
  )
}
