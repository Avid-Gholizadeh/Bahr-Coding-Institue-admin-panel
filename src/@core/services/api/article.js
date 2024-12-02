import {api} from '../interceptor'

export async function getNewsListAdmin(params) {
    try {
        const response = await api.get('/News/AdminNewsFilterList', {params})

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function getNewsCategoryList() {
    try {
        const response = await api.get('/News/GetListNewsCategory')

        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function getSingleNewsComment(params) {
    try {
        const response = await api.get('/News/GetAdminNewsComments', {params})

        return response
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export async function getNewsById(id) {
    try {
        const response = await api.get('/News/' + id)

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function createArticle(articleData) {
    const fd = new FormData()

    Object.entries(articleData).forEach(([key, value]) => {
        fd.append(key, value)
    })

    try {
        const response = await api.post('/News/CreateNews', fd)

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function updateArticle(articleData) {
    const fd = new FormData()

    Object.entries(articleData).forEach(([key, value]) => {
        fd.append(key, value)
    })

    try {
        const response = await api.put('/News/UpdateNews', fd)

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function activeDeactiveArticle(articleData) {
    const fd = new FormData()

    Object.entries(articleData).forEach(([key, value]) => {
        fd.append(key, value)
    })

    try {
        const response = await api.put('/News/ActiveDeactiveNews', fd)

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function editArticleComment(data) {
    try {
        const response = await api.put('/News/UpdateNewsComment', data)

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function createArticleReply(data) {
    try {
        const response = await api.post('/News/CreateNewsReplyComment', data)

        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function createArticleCategory(category) {
    const fd = new FormData()

    Object.entries(category).forEach(([key, value]) => {
        fd.append(key, value)
    })

    try {
        const response = await api.post('/News/CreateNewsCategory', fd)

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function updateArticleCategory(category) {
    const fd = new FormData()

    Object.entries(category).forEach(([key, value]) => {
        fd.append(key, value)
    })

    try {
        const response = await api.put('/News/UpdateNewsCategory', fd)

        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function getAllArticlesForSingleCategory(id) {
    try {
        const response = await api.get('/News/GetNewsWithCategory/' + id)

        return response
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
