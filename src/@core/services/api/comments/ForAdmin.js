import { api } from "../../interceptor/index";

export async function getCommentsForAddmin(
    pageNumber,
    rowsOfPage,
    sortingCol,
    sortType,
    query,
    isAccept
) {
try {
const response = await api.get(
    `/Course/CommentManagment?PageNumber=${pageNumber}&RowsOfPage=${rowsOfPage}&SortingCol=${sortingCol}&SortType=${sortType}&Query=${query}${
        isAccept !== null ? `&Accept=${isAccept}` : ""
    }`
);
    return response;
} catch (error) {
    console.error(error);
    throw new Error("Failed to fetch comments");
}
}

export async function getTeacherComments(pageNumber, rowsOfPage, sortingCol, sortType, isAccept,teacherId){
    try {
        const response = await api.get(
        `/Course/CommentManagment?PageNumber=${pageNumber}&RowsOfPage=${rowsOfPage}&SortingCol=${sortingCol}&SortType=${sortType}&Accept=${
            isAccept !== null ? `&Accept=${isAccept}` : ''}&TeacherId=${teacherId}`)
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function getUserComments(pageNumber, rowsOfPage, sortingCol, sortType, isAccept, userId){
    try {
        const response = await api.get(`/Course/CommentManagment?PageNumber=${pageNumber}&RowsOfPage=${rowsOfPage}&
        SortingCol=${sortingCol}&SortType=${sortType}&Accept=${isAccept !== null ? `&Accept=${isAccept}` : ''}&userId=${userId}`)
        return response;
    } catch (error) {
        console.log(error);
    }
}
export async function acceptCourseComment(commentId) {
    try {
        const response = await api.post(`/Course/AcceptCourseComment?CommentCourseId=${commentId}`);
        return response;
    } catch (error) {
        console.log(error);
    }
}
export async function rejectCourseComment(commentId){
    try {
        const response = await api.post(`/Course/RejectCourseComment?CommentCourseId=${commentId}`);
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function deleteCourseComment(commentId){
    try {
        const response = await api.delete(`/Course/DeleteCourseComment?CourseCommandId=${commentId}`);
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function updateCourseComment(formData){
    try {
        const response = await api.put(`/Course/UpdateCourseComment`,formData)
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function replyCourseComment (formData){
    try {
        const response = await api.post('/Course/AddReplyCourseComment',formData)
        return response
    } catch (error) {
        console.log(error);
    }
}