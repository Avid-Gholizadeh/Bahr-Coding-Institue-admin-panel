import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap'
import { updateCourseComment } from '../../@core/services/api/comments/ForAdmin';
import toast from 'react-hot-toast';

export function EditCommentModal({ formModal, setFormModal, comment }) {
  const [commentTitle, setCommentTitle] = useState(comment?.commentTitle || '');
  const [commentDescription, setCommentDescription] = useState(comment?.describe || '');
  const queryClient = useQueryClient();

  useEffect(() => {
    if (comment) {
      setCommentTitle(comment.commentTitle);
      setCommentDescription(comment.describe);
    }
  }, [comment]);

  const {mutate: editCommentMutate} = useMutation({
    mutationFn: updateCourseComment,
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

    editCommentMutate(formData);
  };


  return (
    <Modal isOpen={formModal} toggle={() => setFormModal(false)} className="modal-dialog-centered">
      <ModalHeader toggle={() => setFormModal(false)}>Edit Comment</ModalHeader>
      <ModalBody>
        <div className="mb-2">
          <Label className="form-label" for="commentTitle">Comment Title:</Label>
          <Input
            type="text"
            id="commentTitle"
            value={commentTitle}
            onChange={(e) => setCommentTitle(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <Label className="form-label" for="commentDescription">Description:</Label>
          <Input
            type="textarea"
            id="commentDescription"
            value={commentDescription}
            onChange={(e) => setCommentDescription(e.target.value)}
          />
        </div>
      </ModalBody>
      <ModalFooter className='m-auto'>
        <Button color="primary" onClick={handleSave}>ذخیره</Button>{' '}
        <Button color="secondary" onClick={() => setFormModal(false)}>انصراف</Button>
      </ModalFooter>
    </Modal>
  );
}
