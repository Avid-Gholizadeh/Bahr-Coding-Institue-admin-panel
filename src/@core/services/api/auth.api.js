import {api} from '../interceptor'

export async function loginUser(userData) {
    try {
        const response = await api.post('/Sign/Login', userData)

        return response
    } catch (error) {
        console.log(error)
    }
}
