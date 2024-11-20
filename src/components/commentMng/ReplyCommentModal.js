import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap'
import { replyCourseComment } from '../../@core/services/api/comments/ForAdmin';
import toast from 'react-hot-toast';

export function ReplyCommentModal({ formModal, setFormModal, comment }) {
  const [commentTitle, setCommentTitle] = useState('');
  const [commentDescription, setCommentDescription] = useState('');
  const queryClient = useQueryClient();


  const {mutate: replyCommentMutate} = useMutation({
    mutationFn: replyCourseComment,
    onSuccess:(response) => {
      if(response.success){
        toast.success(response.message)
        queryClient.invalidateQueries(['comments']);
        setFormModal(false);
      } else{
        toast.error(response.message)
      }

    },
  })
  const handleSave = () => {
    const formData = new FormData();
    formData.append('CommentId', comment.commentId);
    formData.append('CourseId', comment.courseId);
    formData.append('Title', commentTitle);
    formData.append('Describe', commentDescription);

    replyCommentMutate(formData);
  };


  return (
    <Modal isOpen={formModal} toggle={() => setFormModal(false)} className="modal-dialog-centered">
      <ModalHeader toggle={() => setFormModal(false)}> پاسخ دادن به {comment.userFullName} در کورس {comment.courseTitle} </ModalHeader>
      <ModalBody>
        <p>
           عنوان:
           {' '}
          {comment.commentTitle}
        </p>
        <p>
          متن:
          {' '}
          {comment.describe}
        </p>
        <div className="mb-2">
          <Label className="form-label" for="commentTitle">عنوان کامنت شما:</Label>
          <Input
            type="text"
            id="commentTitle"
            value={commentTitle}
            onChange={(e) => setCommentTitle(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <Label className="form-label" for="commentDescription">متن کامنت شما:</Label>
          <Input
            type="textarea"
            id="commentDescription"
            value={commentDescription}
            onChange={(e) => setCommentDescription(e.target.value)}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>Save</Button>{' '}
        <Button color="secondary" onClick={() => setFormModal(false)}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}
