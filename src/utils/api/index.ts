import axios from "axios";

const baseUrl = "http://139.84.173.198:3000/api/v1";
export async function getCategories() {
    try {
        const response = await axios.get(baseUrl + "/getCategories");
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}