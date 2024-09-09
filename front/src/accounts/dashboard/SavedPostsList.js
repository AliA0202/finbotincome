import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

const SavedPostsList = () => {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    const fetchPosts = async (page) => { //get the posts saved by the user
        const response = await axios.get(`http://127.0.0.1/api/blog/saved-posts/?page=${page}`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        });
        const data = response.data;
        setPosts((prevPosts) => [...prevPosts, ...data.results]);
        if(data.next === null) {
            setHasMore(false);
        }
    };

    return (
        <div className="content-bar flex flex-column space-between">
            <h3 className="flex align-center color-dark-blue margin-top-5 margin-bottom-5"><span className="material-symbols-outlined">bookmark</span>&nbsp;پست های ذخیره شده</h3>
            <div className="line-horizontal-gold"></div>
            <div className="control-height">
                <InfiniteScroll
                dataLength={posts.length}
                next={() => setPage((prevPage) => prevPage + 1)}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={""}
                >
                    {posts.map((posts)=>(
                        <Link to={`/post/${posts.post.slug}`} className="flex flex-row saved-post-card" id={posts.post.id}>
                            <div className="margin-less padding-less height-100">
                                <img src={posts.post.banner} className="saved-post-img"></img>
                            </div>
                            <div className="flex space-between margin-right-15 width-full">
                                <h4 className="color-dark-blue margin-less">{posts.post.title}</h4>
                                <a href="#" className="color-dark-blue"><span class="material-symbols-outlined">bookmark_check</span></a>
                            </div>
                        </Link>   
                    ))}
                </InfiniteScroll>
                                     
            </div>
        </div>
    );
}

export default SavedPostsList;