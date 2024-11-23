// hooks/useCommentActions.js
import {useMutation, useQueryClient} from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {
    acceptCourseComment,
    deleteCourseComment,
    rejectCourseComment,
    replyCourseComment,
} from '../../../@core/services/api/comments/ForAdmin'

export const useCommentActions = () => {
    const queryClient = useQueryClient()

    const acceptComment = useMutation({
        mutationFn: acceptCourseComment,
        onSuccess: data => {
            toast.success(data.message)
            queryClient.invalidateQueries({queryKey: ['comments']})
            queryClient.invalidateQueries({queryKey: ['single-course-comment']})
        },
        onError: () => {
            toast.error('Failed to accept comment. Please try again.')
        },
    })

    const rejectComment = useMutation({
        mutationFn: rejectCourseComment,
        onSuccess: data => {
            toast.success(data.message)
            queryClient.invalidateQueries({queryKey: ['comments']})
            queryClient.invalidateQueries({queryKey: ['single-course-comment']})
        },
        onError: () => {
            toast.error('Failed to reject comment. Please try again.')
        },
    })

    const deleteComment = useMutation({
        mutationFn: deleteCourseComment,
        onSuccess: data => {
            toast.success(data.message)
            queryClient.invalidateQueries({queryKey: ['comments']})
            queryClient.invalidateQueries({queryKey: ['single-course-comment']})
        },
        onError: error => {
            toast.error(error.message)
        },
    })

    const addReply = useMutation({
        mutationFn: replyCourseComment,
        onSuccess: () => {
            toast.success('پاسخ ارسال شد')
            queryClient.invalidateQueries({queryKey: ['comments']})
            queryClient.invalidateQueries({queryKey: ['single-course-comment']})
        },
        onError: error => {
            toast.error(error.message)
        },
    })

    return {
        acceptComment,
        rejectComment,
        deleteComment,
    }
}
