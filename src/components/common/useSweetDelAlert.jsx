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
            preConfirm: () => {
                Swal.showLoading()

                return actionFn(courseId)
                    .then(data => {
                        if (data.success) {
                            return MySwal.fire({
                                icon: 'success',
                                title: 'حذف شد!',
                                text: 'عملیات با موفقیت انجام شد',
                                customClass: {
                                    confirmButton: 'btn btn-success',
                                },
                            }).then(() => {
                                if (isSingleCourse) navigate('/courses')
                            })
                        } else {
                            return MySwal.fire({
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
                        console.error(error)

                        return MySwal.fire({
                            icon: 'error',
                            title: 'خطا!',
                            text: 'مشکلی پیش آمده لطفا بعدا امتحان کنید.',
                            customClass: {
                                confirmButton: 'btn btn-danger',
                            },
                        })
                    })
            },
        })
    }

    return {handleDeleteAlert}
}
