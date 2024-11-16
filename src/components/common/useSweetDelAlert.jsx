import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export function useSweetDelAlert({actionFn, isSingleCourse}) {
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)

    const handleDeleteAlert = courseId => {
        return MySwal.fire({
            title: 'آیا مطمئین هستید؟',
            text: 'این عملیات برگشت پذیر نمی‌‌باشد!',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'صرف نظر',
            confirmButtonText: 'انجام عملیات',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ms-1',
            },
            buttonsStyling: false,
        }).then(result => {
            if (result.isConfirmed) {
                actionFn(courseId)
                    .then(data => {
                        if (data.success) {
                            MySwal.fire({
                                icon: 'success',
                                title: 'حذف شد!',
                                text: 'عملیات با موفقیت انجام شد',
                                customClass: {
                                    confirmButton: 'btn btn-success',
                                },
                            })
                            if (isSingleCourse) navigate('/courses')
                        } else {
                            MySwal.fire({
                                icon: 'error',
                                title: 'خطا!',
                                text: 'مشکلی پیش آمده لطفا بعدا امتحان کنید.',
                                customClass: {
                                    confirmButton: 'btn btn-danger',
                                },
                            })
                        }
                    })
                    .catch(error => {
                        MySwal.fire({
                            icon: 'error',
                            title: 'خطا!',
                            text: 'مشکلی پیش آمده لطفا بعدا امتحان کنید.',
                            customClass: {
                                confirmButton: 'btn btn-danger',
                            },
                        })
                    })
            }
        })
    }

    return {handleDeleteAlert}
}
