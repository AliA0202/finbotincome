import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

const SavedPostsList = ({successNotify}) => {
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

    const removeSavedPost = async (key) => {
        const params = {post : key};

        const response = await axios.post(`http://127.0.0.1/api/blog/saved-posts/delete/`, params, {
            headers : {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }).then(response => 
            response.status
        )

        if (response === 200 || response === 204) {
            setPosts(prevPosts => prevPosts.filter(posts => posts.post.id !== key));
            successNotify("پست مورد نظر از لیست ذخیره شده ها حذف گردید");
          }
    };

    return (
        <div className="content-bar flex flex-column space-between">
            <h3 className="flex align-center color-dark-blue margin-top-5 margin-bottom-5"><span className="material-symbols-outlined">bookmark</span>&nbsp;پست های ذخیره شده</h3>
            <div className="line-horizontal-gold"></div>
            <div className="control-height">

                {posts.length > 0 ? <>
                <InfiniteScroll
                dataLength={posts.length}
                next={() => setPage((prevPage) => prevPage + 1)}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={""}
                >
                    {posts.map((posts)=>(
                        <Link to={`/post/${posts.post.slug}`} className="flex flex-row saved-post-card">
                            <img src={posts.post.banner} className="saved-post-img" width="65" height="65"></img>
                            <div className="flex flex-row space-between margin-right-15 width-full align-center">
                                <h4 className="color-dark-blue margin-less">{posts.post.title}</h4>
                                <button className="btn-icon" onClick={(event) => {event.preventDefault();
                                removeSavedPost(posts.post.id)}}><span class="material-symbols-outlined">bookmark_check</span></button>
                            </div>
                        </Link>   
                    ))}
                </InfiniteScroll>    
                </> : (<p className="flex flex-row align-center  padding-15 info-card rounded justify-content-center">
                    <img src={process.env.PUBLIC_URL + "/static/images/icon/sad.png"} width="40" />پست ذخیره شده ای وجود ندارد</p>)}                
            </div>
        </div>
    );
}

export default SavedPostsList;