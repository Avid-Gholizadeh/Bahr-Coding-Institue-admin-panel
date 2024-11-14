import { api } from "../../interceptor/index";

export async function getCommentsForAddmin(pageNumber, rowsOfPage, sortingCol, sortType, query, isAccept) {
    try {
        const response = await api.getComments(`/Course/CommentManagment?PageNumber=${pageNumber}&RowsOfPage=${rowsOfPage}&
        SortingCol=${sortingCol}&SortType=${sortType}&Query=${query}&Accept=${isAccept? isAccept:null}`);
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function getTeacherComments(pageNumber, rowsOfPage, sortingCol, sortType, isAccept,teacherId){
    try {
        const response = await api.getTeacherComments(`/Course/CommentManagment?PageNumber=${pageNumber}&RowsOfPage=${rowsOfPage}&
        SortingCol=${sortingCol}&SortType=${sortType}&Accept=${isAccept? isAccept:null}&TeacherId=${teacherId}`)
        return response;
    } catch (error) {
        console.log(error);
    }
}
export async function getUserComments(pageNumber, rowsOfPage, sortingCol, sortType, isAccept, userId){
    try {
        const response = await api.getTeacherComments(`/Course/CommentManagment?PageNumber=${pageNumber}&RowsOfPage=${rowsOfPage}&
        SortingCol=${sortingCol}&SortType=${sortType}&Accept=${isAccept? isAccept:null}&userId=${userId}`)
        return response;
    } catch (error) {
        console.log(error);
    }
}
export async function acceptCourseComment(commentId) {
    try {
        const response = await api.acceptComments(`/Course/AcceptCourseComment?CommentCourseId=${commentId}`);
        return response;
    } catch (error) {
        console.log(error);
    }
}
export async function rejectCourseComment(commentId){
    try {
        const response = await api.rejectComments(`/Course/RejectCourseComment?CommentCourseId=${commentId}`);
        return response
    } catch (error) {
        console.log(error);
    }
}