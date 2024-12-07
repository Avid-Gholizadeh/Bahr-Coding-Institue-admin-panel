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
            if(data.success){
                toast.success(data.message)
                queryClient.invalidateQueries({queryKey: ['comments']})
                queryClient.invalidateQueries({queryKey: ['userComment']})
                queryClient.invalidateQueries({queryKey: ['single-course-comment']})
            }else (
                toast.error('مشکلی پیش آمد')
            )
        },
        onError: () => {
            toast.error('Failed to accept comment. Please try again.')
        },
    })

    const rejectComment = useMutation({
        mutationFn: rejectCourseComment,
        onSuccess: data => {
            if(data.success){

                toast.success(data.message)
                queryClient.invalidateQueries({queryKey: ['comments']})
                queryClient.invalidateQueries({queryKey: ['userComment']})
                queryClient.invalidateQueries({queryKey: ['single-course-comment']})
            } else (
                toast.error('مشکلی پیش آمد')
            )
        },
        onError: () => {
            toast.error('Failed to reject comment. Please try again.')
        },
    })

    const deleteComment = useMutation({
        mutationFn: deleteCourseComment,
        onSuccess: data => {
            if(data.success){

                toast.success(data.message)
                queryClient.invalidateQueries({queryKey: ['comments']})
                queryClient.invalidateQueries({queryKey: ['userComment']})
                queryClient.invalidateQueries({queryKey: ['single-course-comment']})
            }else (
                toast.error('مشکلی پیش آمد')
            )
        },
        onError: error => {
            toast.error('مشکلی پیش آمد')
        },
    })

    const addReply = useMutation({
        mutationFn: replyCourseComment,
        onSuccess: (data) => {
            if(data.success){

                toast.success('پاسخ ارسال شد')
                queryClient.invalidateQueries({queryKey: ['comments']})
                queryClient.invalidateQueries({queryKey: ['userComment']})
                queryClient.invalidateQueries({queryKey: ['single-course-comment']})
            }else (
                toast.error('مشکلی پیش آمد')
            )
        },
        onError: error => {
            toast.error('مشکلی پیش آمد')
        },
    })

    return {
        acceptComment,
        rejectComment,
        deleteComment,
    }
}
