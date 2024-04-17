import React, { useEffect, useState } from "react";
import { getCategories } from "../../../utils/api";

interface NewsPostData {
    title: string;
    content: string;
    image?: string;
    category: string[];
    tags: string[];
}

const AddPost: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [categories, setCategories] = useState([]);

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

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategories = e.target.value;
        // setNewsPostData(selectedCategories)
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log(" submission", newsPostData);

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
                    <select
                        id="category"
                        className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        value={newsPostData.category || ''}
                        onChange={handleCategoryChange}
                    >
                        <option value="">Select Category</option>
                        {/* Map over the categories array and create an <option> for each category */}
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>

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
        </div>
    );
}

export default AddPost;
