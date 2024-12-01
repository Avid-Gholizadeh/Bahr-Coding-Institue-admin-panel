import { api } from "../interceptor";

export async function getProfile(){
    try {
        const response = await api.get('/SharePanel/GetProfileInfo')
        return response
    } catch (error) {
        console.log(error);
    }
}