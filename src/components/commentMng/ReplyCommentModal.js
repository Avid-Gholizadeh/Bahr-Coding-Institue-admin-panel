import {useMutation, useQueryClient} from '@tanstack/react-query'
import React, {useEffect, useState} from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Spinner} from 'reactstrap'
import {replyCourseComment} from '../../@core/services/api/comments/ForAdmin'
import toast from 'react-hot-toast'
import {createArticleReply} from '@core/services/api/article'

export function ReplyCommentModal({formModal, setFormModal, comment, singleArticle}) {
    const [commentTitle, setCommentTitle] = useState('')
    const [commentDescription, setCommentDescription] = useState('')
    const queryClient = useQueryClient()

    const {mutate: replyCommentMutate, isPending} = useMutation({
        mutationFn: replyCourseComment,
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

    const {mutate: createReplyMutate, isPending: articlePending} = useMutation({
        mutationFn: createArticleReply,
        onSuccess: response => {
            if (response.success) {
                toast.success(response.message)
                // queryClient.invalidateQueries(['single-article-comment', comment.newsId])
                setFormModal(false)
            } else {
                toast.error(response.message)
            }
        },
    })
    // console.log(comment)

    function handleCreateArticleReply() {
        createReplyMutate({
            newsId: comment.newsId,
            userIpAddress: '192.168.0.0',
            title: commentTitle,
            describe: commentDescription,
            userId: singleArticle.userId,
            parentId: comment.id,
        })
        /* console.log({
            newsId: comment.newsId,
            userIpAddress: '192.168.0.0',
            title: commentTitle,
            describe: commentDescription,
            userId: singleArticle.userId,
            parentId: comment.id,
        }) */
    }

    const handleSave = () => {
        const formData = new FormData()
        formData.append('CommentId', comment?.commentId || comment?.id)
        formData.append('CourseId', comment.courseId)
        formData.append('Title', commentTitle)
        formData.append('Describe', commentDescription)

        replyCommentMutate(formData)
    }

    return (
        <Modal
            isOpen={formModal}
            toggle={() => setFormModal(false)}
            className="modal-dialog-centered"
        >
            <ModalHeader toggle={() => setFormModal(false)}>
                پاسخ دادن به : {comment?.userFullName || comment?.author || comment?.autor}
            </ModalHeader>
            <ModalBody>
                <p>عنوان: {comment?.commentTitle || comment?.title}</p>
                <p>متن: {comment.describe}</p>
                <div className="mb-2">
                    <Label className="form-label" for="commentTitle">
                        عنوان کامنت شما:
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
                        متن کامنت شما:
                    </Label>
                    <Input
                        type="textarea"
                        id="commentDescription"
                        value={commentDescription}
                        onChange={e => setCommentDescription(e.target.value)}
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={singleArticle ? handleCreateArticleReply : handleSave}
                    disabled={isPending || articlePending}
                >
                    ارسال
                    {(isPending || articlePending) && (
                        <Spinner className="ms-1" size="sm" color="light" />
                    )}
                </Button>
                <Button color="secondary" onClick={() => setFormModal(false)}>
                    صرف نظر{' '}
                </Button>
            </ModalFooter>
        </Modal>
    )
}
