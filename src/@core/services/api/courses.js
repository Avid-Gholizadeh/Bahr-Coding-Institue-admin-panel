import {api} from '../interceptor'

export async function getAllCourses(params) {
    try {
        const response = await api.get('/Course/CourseList', {
            params,
        })

        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function getCourseByIdAdmin(id) {
    try {
        const response = await api.get('/Course/' + id)

        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function getCreateCourseStep1() {
    try {
        const response = await api.get('/Course/GetCreate')

        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function getAllCourseReserve() {
    try {
        const response = await api.get('/CourseReserve')

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function CreateCourseStep2(courseData) {
    const fd = new FormData()

    Object.entries(courseData).forEach(([key, value]) => {
        fd.append(key, value)
    })

    try {
        const response = await api.post('/Course', fd)

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function addCourseTechStep3({courseTech, courseId}) {
    try {
        const response = await api.post('/Course/AddCourseTechnology', courseTech, {
            params: {courseId},
        })
        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function updateCourse(courseData) {
    const fd = new FormData()

    Object.entries(courseData).forEach(([key, value]) => {
        fd.append(key, value)
    })

    try {
        const response = await api.put('/Course', fd)

        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function activeAndDeactive(data) {
    try {
        const response = await api.put('/Course/ActiveAndDeactiveCourse', data)
        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function changeCourseStatus(data) {
    const fd = new FormData()

    Object.entries(data).forEach(([key, value]) => {
        fd.append(key, value)
    })

    try {
        const response = await api.put('/Course/UpdateCourseStatus', fd)
        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function deleteCourse(data) {
    try {
        const response = await api.delete('/Course/DeleteCourse', {data})
        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function acceptReserve(reserveData) {
    try {
        const response = await api.post('/CourseReserve/SendReserveToCourse', reserveData)
        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function deleteCourseReserve(data) {
    try {
        const response = await api.delete('/CourseReserve', {data})
        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function getSingleCourseGroup(params) {
    try {
        const response = await api.get('/CourseGroup/GetCourseGroup', {params})

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function getAllCoursesGroups(params) {
    try {
        const response = await api.get('/CourseGroup', {params})

        return response
    } catch (error) {
        throw new Error(error)
    }
}
