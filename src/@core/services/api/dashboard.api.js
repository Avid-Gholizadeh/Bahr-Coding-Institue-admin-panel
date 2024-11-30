import { api } from "../interceptor";

export async function getLandingReport() {
    try {
        const response = await api.get('/Home/LandingReport');
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function getNewsReport() {
    try {
        const response = await api.get('/News/AdminNewsFilterList?IsActive=false')
        return response.totalCount;
    } catch (error) {
    }
}

export async function getCourseReport(){
    try {
        const response = await api.get('/Course/CourseList')
        return response.totalCount;
    } catch (error) {
        console.log(error);
    }
}

export async function getDashboardReport(){
    try {
        const response = await api.get('/Report/DashboardReport')
        return response;
    } catch (error) {
        console.log(error);
    }
}