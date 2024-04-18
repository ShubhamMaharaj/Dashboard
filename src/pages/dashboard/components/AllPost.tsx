import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllPost } from '../../../utils/api';

interface Post {
    id: number;
    title: string;
    content: string;
    category: string[];
}

const AllPosts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await getAllPost();
            const newPosts = response;
            setPosts(prevPosts => [...prevPosts, ...newPosts]);
            setPage(prevPage => prevPage + 1);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching posts: ', error);
            setLoading(false);
        }
    };

    const handleDelete = async (postId: number) => {
        try {
            await axios.delete(`YOUR_DELETE_ENDPOINT/${postId}`);
            setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        } catch (error) {
            console.error('Error deleting post: ', error);
        }
    };

    const renderPosts = () => {
        return posts.map(post => (
            <div key={post.id} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'inline-block', width: '10%' }}>{post.id}</div>
                <div style={{ display: 'inline-block', width: '20%' }}>{post.title}</div>
                <div style={{ display: 'inline-block', width: '40%' }}>{post.content}</div>
                <div style={{ display: 'inline-block', width: '20%' }}>{post.category.join(', ')}</div>
                <div style={{ display: 'inline-block', width: '10%' }}>
                    <button style={{ marginRight: '10px' }} onClick={() => handleEdit(post.id)}>Edit</button>
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
            </div>
        ));
    };

    return (
        <div>
            <div style={{ marginBottom: '20px', fontWeight: 'bold' }}>
                <div style={{ display: 'inline-block', width: '10%' }}>ID</div>
                <div style={{ display: 'inline-block', width: '20%' }}>Title</div>
                <div style={{ display: 'inline-block', width: '40%' }}>Content</div>
                <div style={{ display: 'inline-block', width: '20%' }}>Selected Categories</div>
                <div style={{ display: 'inline-block', width: '10%' }}>Options</div>
            </div>
            <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                {renderPosts()}
                {loading && <p>Loading...</p>}
            </div>
            <button onClick={fetchPosts}>Load More</button>
        </div>
    );
};


export default AllPosts;
