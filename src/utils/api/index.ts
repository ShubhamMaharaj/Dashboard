import axios from "axios";

const baseUrl = "http://139.84.173.198:3000/api/v1";

interface NewsPostData {
    title: string;
    content: string;
    image?: string;
    category: string[];
    tags: string[];
}
interface SendNotificationType {
    customTitle: string;
    customDescription: string;
    id: number | null;
}
export async function getCategories() {
    try {
        const response = await axios.get(baseUrl + "/getCategories");
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function postNews(data: NewsPostData) {
    try {
        console.log("bataa", data);
        const response = await axios.post(baseUrl + "/create-news", data);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function getAllPost() {
    try {
        const response = await axios.get(baseUrl + "/getallnews");
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function uploadImage() {
    try {
        const response = await axios.get(baseUrl + "/upload-image");
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export async function deletePost(id: any) {
    try {
        const response = await axios.delete(baseUrl + "/deleteNewsById/" + id);

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export async function getPostbyId(id: any) {
    try {
        const response = await axios.get(baseUrl + "/getnewsbyid/" + id);

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export async function SendNotification(data: SendNotificationType) {
    try {
        const response = await axios.post(baseUrl + "/send-notification", data);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}