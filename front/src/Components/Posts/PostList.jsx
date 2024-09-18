import React from "react";
import "./Posts.css";
import Post from "./Post/Post";
import ReactPaginate from 'react-paginate';
import { useEffect, useState, useCallback} from "react";
import axios from 'axios';


function PostList({queryString=null, boxTitle}){
    const [posts, setPosts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = useCallback(async (page = 1) => {
        try {
            let url = `http://127.0.0.1/api/blog/posts/?page=${page}`
            if(queryString !== "" || queryString !== null){
                url = `http://127.0.0.1/api/blog/posts/?${queryString}page=${page}`;
            }

            const response = await axios.get(url);
            setPosts(response.data.results);
            setTotalCount(response.data.count);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err);
        }
    }, [queryString]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);


    const handlePageClick = (event) => {
        fetchPosts(event.selected + 1);
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    
    return (
        <>  
            

            <div className="padding-25">
                {boxTitle && 
                <h1 className="color-dark-blue flex justify-content-center align-center text-control"><span class="material-symbols-outlined color-gold">fiber_new</span>&nbsp;{boxTitle}</h1>
                }
                <div className="flex flex-row mobile-control flex-wrap">
                {
                    posts.map((post) => (
                        filterPosts(post)
                    ))
                } 
                </div>
            </div>
                
            <ReactPaginate
                nextLabel="بعدی >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={Math.ceil(totalCount / 10)} // Adjust based on your PAGE_SIZE
                previousLabel="قبلی <"
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
        </>
    );
    function filterPosts(post){
        if(post.is_promoted !== true){
            return <Post post={post} key={post.slug} ></Post>
        }
    }
}

export default PostList;