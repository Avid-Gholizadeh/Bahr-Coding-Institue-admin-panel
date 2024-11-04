import { api } from "../../interceptor";

export async function getLandingReport() {
    try {
        const response = await api.get('/Home/LandingReport');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}