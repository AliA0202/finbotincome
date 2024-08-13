import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import PostInList from './Posts'
import "./style.css";


function PostsList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async (page = 1) => {
        try {
            const response = await axios.get(`http://127.0.0.1/api/blog/posts/?page=${page}`);
            setPosts(response.data.results);
            setTotalCount(response.data.count);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    const handlePageClick = (event) => {
        fetchPosts(event.selected + 1);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Posts</h1>
            {posts.map(post => (
                <div>
                <PostInList post={post} key={post.slug} />
                <br />
                </div>
            ))}
            <ReactPaginate
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={Math.ceil(totalCount / 10)} // Adjust based on your PAGE_SIZE
                previousLabel="< Previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
        </div>
    )
};

export default PostsList;