import {useMutation, useQueryClient} from '@tanstack/react-query'
import React, {useEffect, useState} from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Spinner} from 'reactstrap'
import {updateCourseComment} from '../../@core/services/api/comments/ForAdmin'
import toast from 'react-hot-toast'
import {editArticleComment} from '@core/services/api/article'

export function EditCommentModal({formModal, setFormModal, comment, singleArticle}) {
    const [commentTitle, setCommentTitle] = useState(comment?.commentTitle || comment?.title || '')
    const [commentDescription, setCommentDescription] = useState(comment?.describe || '')
    const queryClient = useQueryClient()

    useEffect(() => {
        if (comment) {
            setCommentTitle(comment?.commentTitle || comment?.title)
            setCommentDescription(comment.describe)
        }
    }, [comment])

    const {mutate: editCommentMutate, isPending} = useMutation({
        mutationFn: updateCourseComment,
        onSuccess: response => {
            if (response.success) {
                toast.success(response.message)
                queryClient.invalidateQueries(['comments'])
                setFormModal(false)
            } else {
                toast.error(response.message)
            }
        },
    })

    const {mutate: editArticleCommentMutate, isPending: articlePending} = useMutation({
        mutationFn: editArticleComment,
        onSuccess: response => {
            if (response.success) {
                toast.success(response.message)
                queryClient.invalidateQueries(['single-article-comment', comment.newsId])
                setFormModal(false)
            } else {
                toast.error(response.message)
            }
        },
    })

    function handleEditArticleComment() {
        editArticleCommentMutate({
            id: comment.id,
            newsId: comment.newsId,
            title: commentTitle,
            describe: commentDescription,
            accept: true,
        })
    }

    const handleSave = () => {
        const formData = new FormData()
        formData.append('CommentId', comment.commentId || comment?.id)
        formData.append('CourseId', comment.courseId)
        formData.append('Title', commentTitle)
        formData.append('Describe', commentDescription)

        editCommentMutate(formData)
    }

    return (
        <Modal
            isOpen={formModal}
            toggle={() => setFormModal(false)}
            className="modal-dialog-centered"
        >
            <ModalHeader toggle={() => setFormModal(false)}>Edit Comment</ModalHeader>
            <ModalBody>
                <div className="mb-2">
                    <Label className="form-label" for="commentTitle">
                        Comment Title:
                    </Label>
                    <Input
                        type="text"
                        id="commentTitle"
                        value={commentTitle}
                        onChange={e => setCommentTitle(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <Label className="form-label" for="commentDescription">
                        Description:
                    </Label>
                    <Input
                        type="textarea"
                        id="commentDescription"
                        value={commentDescription}
                        onChange={e => setCommentDescription(e.target.value)}
                    />
                </div>
            </ModalBody>
            <ModalFooter className="m-auto">
                <Button
                    color="primary"
                    onClick={singleArticle ? handleEditArticleComment : handleSave}
                    disabled={isPending || articlePending}
                >
                    ذخیره
                    {(isPending || articlePending) && (
                        <Spinner className="ms-1" size="sm" color="light" />
                    )}
                </Button>
                <Button color="secondary" onClick={() => setFormModal(false)}>
                    انصراف
                </Button>
            </ModalFooter>
        </Modal>
    )
}
