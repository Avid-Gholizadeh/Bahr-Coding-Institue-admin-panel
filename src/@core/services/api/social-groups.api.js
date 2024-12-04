import {api} from '../interceptor'

export async function getAllSocialGroups() {
    try {
        const response = await api.get('/CourseSocialGroup')

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function createSocialGroup(data) {
    try {
        const response = await api.post('/CourseSocialGroup', data)

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function updateSocialGroup(data) {
    try {
        const response = await api.put('/CourseSocialGroup', data)

        return response
    } catch (error) {
        throw new Error(error)
    }
}
