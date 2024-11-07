import { api } from "../interceptor/index";

export const AddRole = async (roleId, id, status) => {
    try{
     
     const response = await api.post(`/User/AddUserAccess?Enable=${status}`, {
         roleId: roleId,
         userId: id
       })
 
     return response
 
    } catch(err){
     console.log(err)
    }
 }

 export const AddUser = async (data) => {
    try { 
        const response = await api.post(`/User/CreateUser`, data)
        return response
    } catch (error) {
        console.log(error);
    }
}

export const DeleteUser = async (id) => {
    try{
     
     console.log(id)
     const response = await api.delete(`/User/DeleteUser`, {
         userId: id
       })
 
     return response
 
    } catch{
     return []
    }
 }

 export const GetDetailUser = async (id) => {
    try{
     
     const response = await api.get(`/User/UserDetails/${id}`)
     return response
 
    } catch{
     return []
    }
 }

 export async function GetTotalCount () {
    try {        
        const response = await api.get(`/User/UserMannage?PageNumber=1&RowsOfPage=10`)
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function GetUserList (SortType, SortingCol, Query, PageNumber, RowsOfPage, IsActiveUser, IsDeletedUser, currentRole) {
    try {        
        const response = await api.get(`/User/UserMannage?PageNumber=${PageNumber}&RowsOfPage=${RowsOfPage}&SortingCol=${SortingCol}&SortType=${SortType}&Query=${Query}${IsActiveUser !== null ? `&IsActiveUser=${IsActiveUser}` : ''}${IsDeletedUser !== null ? `&IsDeletedUser=${IsDeletedUser}` : ''}&roleId=${currentRole.value}`)
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function UpdateUser (data) {
    try{
     
     const response = await api.put(`/User/UpdateUser`, data)
 
     return response
 
    } catch(err){
     return err.message
    }
 }