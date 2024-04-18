import React, { useEffect, useState } from "react";
import { getCategories, postNews } from "../../../utils/api";
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface NewsPostData {
    title: string;
    content: string;
    image?: string;
    category: string[];
    tags: string[];
}
interface OptionType {
    value: string;
    label: string;
}
const AddPost: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState<{ value: string; label: string; }[]>([]);
    const [newsPostData, setNewsPostData] = useState<NewsPostData>({
        title: "",
        content: "",
        image: "",
        category: [],
        tags: []
    });

    // use effect 
    useEffect(() => {
        const cat = getCategories().then(category => {
            // console.log(" cat: " + JSON.stringify(category));
            setCategories(category.categories);
        });
    }, [])

    // function 

    const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setNewsPostData(prevData => ({
            ...prevData,
            title: newTitle
        }));
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // newsPostData.content = e.target.value;
        const newContent = e.target.value;
        setNewsPostData(prevData => ({
            ...prevData,
            content: newContent
        }))
    };

    const handleCategoryChange = (selectedOptions: OptionType[]) => {
        setSelectedCategories(selectedOptions as { value: string; label: string; }[]);
        const selectedCategoryValues = selectedOptions.map(option => option.value);

        // Update newsPostData with selected category values
        setNewsPostData(prevData => ({
            ...prevData,
            category: selectedCategoryValues
        }));
        // console.log(" Selected categories ", newsPostData);

    };



    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        // Handle form submission logic here
        if (!newsPostData.title || !newsPostData.content || !selectedCategories.length) {
            toast.error("Please fill in all fields.");
            return;
        }
        const res = await postNews(newsPostData);
        if (res.status === 201) {
            console.log(" submission", res.status);
            setNewsPostData({
                title: "",
                content: "",
                image: "",
                category: [],
                tags: []
            })
            setSelectedCategories([]);
        }
    };
    const uploadImage = async () => {
        if (!image) {
            alert('Please select an image');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch('http://139.84.173.198:3000/api/v1/upload-image', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const data = await response.json();
            console.log('Image uploaded successfully:', data.link);
            setNewsPostData(prevData => ({
                ...prevData,
                image: data.link
            }))
            // You can do something with the uploaded image link here
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };



    return (
        <div className="container mx-auto mt-10 flex ml-12">
            <div className="flex-1 mr-5">
                <h1 className="text-2xl font-bold mb-4">Add Post</h1>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
                    <Select
                        id="category"
                        className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        options={categories.map(category => ({ value: category, label: category }))}
                        value={selectedCategories}
                        onChange={handleCategoryChange}
                        isMulti // Enable multiple selection
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="header" className="block text-gray-700 font-bold mb-2">Header</label>
                    <input
                        type="text"
                        id="header"
                        className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        value={newsPostData.title}
                        onChange={handleHeaderChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
                    <textarea
                        id="content"
                        className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        rows={5}
                        value={newsPostData.content || ''}
                        onChange={handleContentChange}
                    ></textarea>
                </div>
                <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
            <div>
                <h2 className="text-xl font-bold mb-4">Upload Image</h2>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {image && (
                    <div className="mt-4">
                        <img src={URL.createObjectURL(image)} alt="Uploaded" className="max-w-40 h-auto" />
                    </div>
                )}
                <button onClick={uploadImage} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Upload Image
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AddPost;
