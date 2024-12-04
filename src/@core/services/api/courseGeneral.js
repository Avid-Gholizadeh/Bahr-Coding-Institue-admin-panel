import { api } from "../interceptor";

export async function getCourseslevels(){
    try {
        const response = await api.get('/CourseLevel/GetAllCourseLevel');
        return response
    } catch (error) {
        console.log(error);
    }
}
export async function updateCourselevel(dataObj){
    try {
        const response = await api.put('/CourseLevel',dataObj);
        return response
    } catch (error) {
        console.log(error);
    }
}
export async function createCourseLevel(dataObj){
    try {
        const response = await api.post('/CourseLevel',dataObj);
        return response
    } catch (error) {
        console.log(error);
    }
}
export async function getTerms(){
    try {
        const response = await api.get('/Term');
        return response
    } catch (error) {
        console.log(error);
    }
}
export async function updateTerm(dataObj){
    try {
        const response = await api.put('/Term', dataObj);
        return response
    } catch (error) {
        console.log(error);
    }
}
export async function createTerm(dataObj){
    try {
        const response = await api.post('/Term', dataObj);
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function getTechs(){
    try {
        const response = await api.get('/Technology')
        return response
    } catch (error) {
        console.log(error);
    }
}
export async function createTech(dataObj){
    try {
        const response = await api.post('/Technology', dataObj);
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function updateTech(dataObj){
    try {
        const response = await api.put('/Technology', dataObj);
        return response
    } catch (error) {
        console.log(error);
    }
}