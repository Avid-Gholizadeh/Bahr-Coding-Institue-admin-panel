import {api} from '../interceptor'

export async function getAllBuildings() {
    try {
        const response = await api.get('/Building')

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function createBuilding(data) {
    try {
        const response = await api.post('/Building', data)

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function updateBuilding(data) {
    try {
        const response = await api.put('/Building', data)

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function activeDeactiveBuilding(data) {
    try {
        const response = await api.put('/Building/Active', data)

        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function getAllDepartments() {
    try {
        const response = await api.get('/Department')

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function createDepartment(data) {
    try {
        const response = await api.post('/Department', data)

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function updateDepartment(data) {
    try {
        const response = await api.put('/Department', data)

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function getAllClassRooms() {
    try {
        const response = await api.get('/ClassRoom')

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function createClassRoom(data) {
    try {
        const response = await api.post('/ClassRoom', data)

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function updateClassRoom(data) {
    try {
        const response = await api.put('/ClassRoom', data)

        return response
    } catch (error) {
        throw new Error(error)
    }
}
