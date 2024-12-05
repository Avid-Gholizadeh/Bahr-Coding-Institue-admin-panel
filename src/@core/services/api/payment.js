import { api } from "../interceptor";

export async function getUserPayList(userId){
    try {
        const response = await api.get(`/CoursePayment/UserPayList?StudentId=${userId}`);
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function getCoursePayment(courseId){
    try {
        const response = await api.get(`/CoursePayment/ListOfWhoIsPay?CourseId=${courseId}`);
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function acceptCoursePayment(paymentId){
    try {
        const response = await api.put('/CoursePayment/Accept', paymentId);
        return response
    } catch (error) {
        console.log(error);
    }
}
export async function deleteCoursePayment(paymentId){
    try {
        const response = await api.put('/CoursePayment', paymentId);
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function getCoursesPayments(){
    try {
        const response = await api.get('/CoursePayment?CourseId=b1ab5584-6c6f-ef11-b6da-8f406465b439');
        return response
    } catch (error) {
        console.log(error);
    }
}