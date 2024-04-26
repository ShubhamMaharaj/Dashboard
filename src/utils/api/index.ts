import axios from "axios";

const baseUrl = "http://139.84.173.198:3000/api/v1";

interface NewsPostData {
    title: string;
    content: string;
    image?: string;
    category: string[];
    tags: string[];
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