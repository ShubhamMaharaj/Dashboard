import React, { useEffect, useState } from "react";
import Select, { SingleValue } from 'react-select';
import Swal from "sweetalert2";
import { Post } from "../../../constants/types";
import { getAllPost, SendNotification } from "../../../utils/api";

interface PostData {
    customTitle: string;
    customDescription: string;
    id: number | null;
}
interface OptionType {
    value: string;
    label: string;
}
const PushNotification: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<OptionType | null>(null);
    const [categories, setCategories] = useState<OptionType[]>([]);
    const [data, setData] = useState<PostData>({
        customTitle: '',
        customDescription: '',
        id: null,
    })
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await getAllPost();
            const posts: Post[] = response.data;
            console.log("posts:", posts);

            const categoryOptions = posts.map(post => {
                // console.log("post", post);
                return { label: post.title, value: post.id.toString() };
            });

            setCategories(categoryOptions);
            console.log("category options:", JSON.stringify(categoryOptions));

        } catch (error) {
            console.error('Error fetching posts: ', error);
        }
    };


    const handleCategoryChange = (selectedOption: SingleValue<OptionType>) => {
        setSelectedCategory(selectedOption);
        const objectKey: string = "id";
        setData(prevData => ({
            ...prevData,
            [objectKey]: Number(selectedOption?.value)
        }));
        console.log("selected", selectedOption);
    };
    const handleNotification = (e: React.ChangeEvent<HTMLInputElement>, objectKey: string) => {
        console.log(" object ", objectKey, typeof objectKey);

        const newTitle = e.target.value;
        setData(prevData => ({
            ...prevData,
            [objectKey]: newTitle
        }));
        // console.log("hearder change  ", newsPostData);

    };

    const handleSubmit = async () => {
        try {
            const res = await SendNotification(data);
            console.log(" sumb ", res.data);
            if (res.data.status) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Submission successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setData({
                    customTitle: '',
                    customDescription: '',
                    id: null,
                })
                setSelectedCategory(null)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="w-full p-10">
                <h1 className="text-3xl font-normal mb-4 text-center">Push Notification</h1>
                <div className="m-4">
                    <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Select News</label>
                    <Select
                        id="category"
                        className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        options={categories}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    />
                    <div className="flex-1 mb-4">
                        <label htmlFor="source" className="block text-gray-700 font-bold mb-2">Custom Title</label>
                        <input
                            type="text"
                            id="source"
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                            value={data.customTitle}
                            onChange={(e) => handleNotification(e, 'customTitle')}
                        />
                    </div>
                    <div className="flex-1 mb-4">
                        <label htmlFor="source" className="block text-gray-700 font-bold mb-2">Custom Description</label>
                        <input
                            type="text"
                            id="source"
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                            value={data.customDescription}
                            onChange={(e) => handleNotification(e, 'customDescription')}
                        />
                    </div>
                </div>
                <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </>
    )
};

export default PushNotification;