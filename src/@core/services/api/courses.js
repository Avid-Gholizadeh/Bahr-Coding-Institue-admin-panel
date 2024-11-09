import {api} from '../interceptor'

export async function getAllCourses(params) {
    try {
        const response = await api.get('/Course/CourseList', {
            params,
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export async function getCourseByIdAdmin(id) {
    try {
        const response = await api.get('/Course/' + id)

        return response
    } catch (error) {
        console.log(error)
    }
}

export async function getCreateCourseStep1() {
    try {
        const response = await api.get('/Course/GetCreate')

        return response
    } catch (error) {
        console.log(error)
    }
}
