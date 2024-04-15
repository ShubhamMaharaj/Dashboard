import React, { useState } from "react";

const AddPost: React.FC = () => {
    const [header, setHeader] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);

    const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeader(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        // Handle form submission logic here
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
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        <option value="">Select Category</option>
                        <option value="">Select Category2</option>
                        <option value="">Select Category3</option>
                        <option value="">Select Category4</option>
                        {/* Add options for categories */}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="header" className="block text-gray-700 font-bold mb-2">Header</label>
                    <input
                        type="text"
                        id="header"
                        className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        value={header}
                        onChange={handleHeaderChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
                    <textarea
                        id="content"
                        className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        rows={5}
                        value={content}
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
            </div>
        </div>
    );
}

export default AddPost;
