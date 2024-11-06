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
