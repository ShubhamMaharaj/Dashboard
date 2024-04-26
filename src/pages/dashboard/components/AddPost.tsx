import React, { useEffect, useState } from "react";
import { getCategories, postNews } from "../../../utils/api";
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
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
    const [imageLink, setImageLink] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<{ value: string; label: string; }[]>([]);
    const [newsPostData, setNewsPostData] = useState<NewsPostData>({
        title: "",
        content: "",
        image: "",
        category: [],
        tags: []
    });
    const [hubTypes, setHubTypes] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const addTag2 = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            if (inputValue.trim() !== '') {
                setHubTypes([...hubTypes, inputValue.trim()]);
                setInputValue('');
            }
        }
    };

    const removeTag2 = (index: number) => {
        const newTags = [...hubTypes];
        newTags.splice(index, 1);
        setHubTypes(newTags);
    };

    const removeLastTag2 = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && inputValue === '') {
            e.preventDefault();
            setHubTypes(prevState => prevState.slice(0, prevState.length - 1));
        }
    };

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
        // console.log(e);
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    useEffect(() => {
        setNewsPostData((prevData) => ({
            ...prevData,
            image: imageLink,
        }));
        // console.log(" image link ", imageLink, newsPostData);
        if (newsPostData.image) {
            finalCall()
        }
    }, [imageLink])
    const handleSubmit = async () => {
        console.log(" sdfsdf ", hubTypes, inputValue);
        try {
            const imageUploaded = await uploadImage();

            if (!newsPostData.title || !newsPostData.content || !selectedCategories.length) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please fill all the fields!',
                });
                return;
            }
            else if (!imageUploaded) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please upload an image!',
                });
                return;
            } else {
                // finalCall()
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };
    const finalCall = async () => {
        const res = await postNews(newsPostData);
        if (res.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Submission successful!',
            });
            setNewsPostData({
                title: '',
                content: '',
                image: '',
                category: [],
                tags: [],
            });
            setImage('');

            setSelectedCategories([]);
        }
    }
    const uploadImage = async () => {
        try {
            if (!image) {
                throw new Error('Please select an image');
            }

            const formData = new FormData();
            formData.append('image', image);

            const response = await axios.post('http://139.84.173.198:3000/api/v1/upload-image', formData);


            const data = response.data;
            // console.log('Image uploaded successfully:', data);
            setImageLink(data.link);
            setNewsPostData((prevData) => ({
                ...prevData,
                image: data.link,
            }));
            // Handle the response data

            return true;
        } catch (error) {
            console.error('Error uploading image:', error.message);
            setNewsPostData((prevData) => ({
                ...prevData,
                image: '', // Empty the image state in case of an error
            }));
            return false;
        }
    };


    return (
        <div className="w-full p-10" style={{ overflowY: 'scroll', maxHeight: '90vh' }}>
            <div className="w-full" >
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
                <div className="col-lg-12 mt-2">
                    <span className="text-lg font-semibold text-gray-600">Enter Tags:</span>
                </div>
                <div className="col-md-12 mt-4">
                    <div className="flex flex-wrap gap-2 items-center">
                        {hubTypes.map((tag, index) => (
                            <div key={index} className="bg-blue-200 rounded-lg py-1 px-3 flex items-center">
                                <div className="mr-2">{tag}</div>
                                <button
                                    onClick={() => removeTag2(index)}
                                    className="text-red-600 hover:text-red-800 transition duration-200 focus:outline-none"
                                >
                                    <svg
                                        className="w-4 h-4 fill-current"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M11.4142 10l4.2929-4.2929c.3905-.3905.3905-1.0237 0-1.4142-.3905-.3905-1.0237-.3905-1.4142 0L10 8.5858 5.7071 4.2929c-.3905-.3905-1.0237-.3905-1.4142 0-.3905.3905-.3905 1.0237 0 1.4142L8.5858 10l-4.2929 4.2929c-.3905.3905-.3905 1.0237 0 1.4142.3905.3905 1.0237.3905 1.4142 0L10 11.4142l4.2929 4.2929c.3905.3905 1.0237.3905 1.4142 0 .3905-.3905.3905-1.0237 0-1.4142L11.4142 10z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        <input
                            type="text"
                            placeholder="   Enter Hub"
                            className="bg-gray-100 rounded-lg py-1 px-3 focus:outline-none focus:ring focus:border-blue-300"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={e => {
                                addTag2(e);
                                removeLastTag2(e);
                            }}
                        />
                    </div>
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
                <div className="mb-4">
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
                    {/* <button onClick={uploadImage} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Upload Image
                </button> */}
                </div>
                <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>

            <ToastContainer />
        </div>
    );
}

export default AddPost;
