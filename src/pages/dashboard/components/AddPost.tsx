import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { getCategories, postNews } from "../../../utils/api";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
interface NewsPostData {
    title: string;
    content: string;
    image?: string;
    category: string[];
    tags: string[];
    newsSourceLink: string,
    newsSourceName: string,
    isPrimary: boolean,
    isVisible: boolean,
}
interface OptionType {
    value: string;
    label: string;
}

interface AddPostProps {
    getPodtbyId?: NewsPostData | null;
    loseIsEdit?: () => void;
}

const AddPost = ({ getPodtbyId, loseIsEdit }: AddPostProps) => {
    const [image, setImage] = useState<File | null>(null);
    const [imageByEdit, setImageByEdit] = useState<string | undefined>("");
    const [categories, setCategories] = useState([]);
    const [imageLink, setImageLink] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<{ value: string; label: string; }[]>([]);
    const [newsPostData, setNewsPostData] = useState<NewsPostData>({
        title: "",
        content: "",
        image: "",
        category: [],
        tags: [],
        newsSourceLink: '',
        newsSourceName: '',
        isPrimary: false,
        isVisible: true,
    });
    const [hubTypes, setHubTypes] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const addTag2 = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
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
        getCategories().then(category => {
            setCategories(category.categories);
            console.log(" cat: " + JSON.stringify(category));
        });
    }, [])

    // function 
    const handleNewsData = (e: React.ChangeEvent<HTMLInputElement>, objectKey: string) => {

        const newTitle = e.target.value;
        setNewsPostData(prevData => ({
            ...prevData,
            [objectKey]: newTitle
        }));
        // console.log("hearder change  ", newsPostData);

    };


    const handleCategoryChange = (selectedOptions: OptionType[]) => {
        // console.log("sel", selectedCategories);
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
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // console.log(e);
        const data = e.target.value;

        setNewsPostData(prevData => ({
            ...prevData,
            content: data
        }));
    };


    useEffect(() => {
        // console.log("aaa", selectedCategories);
        setNewsPostData((prevData) => ({
            ...prevData,
            image: imageLink,
        }));
        // console.log(" image link ", imageLink, newsPostData);
        if (newsPostData.image && !getPodtbyId) {
            finalCall()
        }
        console.log("get pod by id ", getPodtbyId);
        if (getPodtbyId) {
            const cat = getPodtbyId.category.map(item => ({
                value: item,
                label: item
            }));
            // console.log(cat);

            setSelectedCategories(cat as { value: string; label: string; }[]);
            // console.log("ccc", selectedCategories);

            setNewsPostData((prevData) => ({
                ...prevData,
                title: getPodtbyId.title,
                content: getPodtbyId.content,
                image: getPodtbyId.image,
                category: getPodtbyId.category,
                tags: getPodtbyId.tags,
                newsSourceName: getPodtbyId.newsSourceName,
                newsSourceLink: getPodtbyId.newsSourceLink
            }));
            // setImage(getPodtbyId.image);
            setImageByEdit(getPodtbyId.image)

        }


    }, [imageLink])
    const handleSubmit = async () => {
        try {
            if (!getPodtbyId) {
                uploadImage();
            }

            if (!newsPostData.title || !newsPostData.content || !selectedCategories.length) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please fill all the fields!',
                });
                return;
            }
            else if (newsPostData.image == '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please upload an image!',
                });
                return;
            } else if (getPodtbyId) {
                finalCall()
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
                position: "top-end",
                icon: "success",
                title: "Submission successful!",
                showConfirmButton: false,
                timer: 1500
            });

            setNewsPostData({
                title: "",
                content: "",
                image: "",
                category: [],
                tags: [],
                newsSourceLink: '',
                newsSourceName: '',
                isPrimary: false,
                isVisible: true,
            });
            setImage(null);
            setSelectedCategories([]);
            if (getPodtbyId && loseIsEdit) {
                loseIsEdit();
            }

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
            // console.error('Error uploading image:', error.message);
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

                <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
                <Select
                    id="category"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    options={categories.map(category => ({ value: category, label: category }))}
                    value={selectedCategories}
                    onChange={() => handleCategoryChange}
                    isMulti // Enable multiple selection
                />

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
                            placeholder="   Enter Tags..."
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
                        onChange={(e) => handleNewsData(e, 'title')}
                    />
                </div>
                <div className="mb-4"
                    style={{}}
                >
                    <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
                    <textarea
                        id="content"
                        className="border border-gray-300 rounded-md px-4 py-2 w-full"
                        rows={5}
                        value={newsPostData.content || ''}
                        onChange={(e) => handleContentChange(e)}
                    ></textarea>
                    {/* <CKEditor

                        editor={ClassicEditor}
                        data="<p>Hello from CKEditor&nbsp;5!</p>"
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event) => {
                            console.log(JSON.stringify(event));
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    /> */}
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
                            <img src={getPodtbyId ? imageByEdit : URL.createObjectURL(image)} alt="Uploaded" className="max-w-40 h-auto" />
                        </div>
                    )}
                    {/* <button onClick={uploadImage} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Upload Image
                </button> */}
                </div>
                <div className="flex grid gap-8 grid-cols-2">
                    <div className="flex-1 mb-4">
                        <label htmlFor="source" className="block text-gray-700 font-bold mb-2">Source Name*</label>
                        <input
                            type="text"
                            id="source"
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                            value={newsPostData.newsSourceName}
                            onChange={(e) => handleNewsData(e, 'newsSourceName')}
                        />
                    </div>
                    <div className="flex-1 mb-4">
                        <label htmlFor="source" className="block text-gray-700 font-bold mb-2">Source Link*</label>
                        <input
                            type="text"
                            id="source"
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                            value={newsPostData.newsSourceLink}
                            onChange={(e) => handleNewsData(e, 'newsSourceLink')}
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

            <ToastContainer />
        </div>
    );
}

export default AddPost;