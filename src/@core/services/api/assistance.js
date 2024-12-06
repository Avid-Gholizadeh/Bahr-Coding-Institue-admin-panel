import {api} from '../interceptor'

export async function getAllAssistance() {
    try {
        const response = await api.get('/CourseAssistance')

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function createAssistance(data) {
    try {
        const response = await api.post('/CourseAssistance', data)

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function updateAssistance(data) {
    try {
        const response = await api.put('/CourseAssistance', data)

        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function getAllAssistanceWorks() {
    try {
        const response = await api.get('/AssistanceWork')

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function createAssistanceWorks(data) {
    try {
        const response = await api.post('/AssistanceWork', data)

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function updateAssistanceWorks(data) {
    try {
        const response = await api.put('/AssistanceWork', data)

        return response
    } catch (error) {
        throw new Error(error)
    }
}
