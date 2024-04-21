import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getAllPost } from '../../../utils/api';

const PAGE_SIZE = 10; // Number of items per page

const AllPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [Total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [showFullDescription, setShowFullDescription] = useState({});

  const toggleDescription = (postId) => {
    setShowFullDescription({
      ...showFullDescription,
      [postId]: !showFullDescription[postId],
    });
  };

  useEffect(() => {
    fetchPosts();
    
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await getAllPost();
      console.log("check",response)
      setTotal(response.length);
      const startIndex = (currentPage-1) * PAGE_SIZE;
      
      const paginatedPosts = response.slice(startIndex, startIndex + PAGE_SIZE);
      setPosts(paginatedPosts);
     
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts: ', error);
      setLoading(false);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(page)
    setCurrentPage(page);
  };

  const renderPosts = () => {
    return (
      <table className="table-auto w-full border-collapse ">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Content</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody >
          {posts.map(post => (
            <tr key={post.id} className="border-b ">
              <td className="px-4 py-2">{post.id}</td>
              <td className="px-4 py-2">{post.title}</td>
              <td className="px-4 py-2">{post.content}</td>
              <td className="px-4 py-2">{post.category.join(', ')}</td>
              <td className="px-4 py-2">
                    <button style={{ marginRight: '10px' }} onClick={() => handleEdit(post.id)}>Edit</button>
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
               </td>
            </tr>
          ))}
        </tbody>
      </table>
   
    );
  };

  return (
    <div className="w-full p-10 ">
      <h1 className="text-2xl font-bold mb-4">All Posts {posts.length}</h1>
      {/* Render posts */}
      <div className="overflow-y-scroll" style={{ maxHeight: '70vh' }}>
        {renderPosts()}
      </div>
      {/* Render pagination */}
      <Stack spacing={2} className="mt-5">
        <Pagination
          count={Math.ceil(Total/ PAGE_SIZE)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default AllPosts;
