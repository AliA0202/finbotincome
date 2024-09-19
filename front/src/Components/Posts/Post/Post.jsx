import React from "react";
import "../PromotedPost/PromotedPost.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component';


function Post({post, key}){
    
    const [savedPosts, setSavePost] = useState([]);
    const [error, setError] = useState(null);
    const [savedPostsId, setSavedPostsId] = useState([]);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    let ids = [];
        
    function getSavedPostsId(item){
        ids.push(item.post.id);
    }

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

        data.results.forEach(getSavedPostsId);
        setSavedPostsId(ids);
    };

    const savePost = async (key) => {
        try {
            const params = {post : key};
            const response = await axios.post(`http://127.0.0.1/api/blog/saved-posts/create/`, params, {
                headers : {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            }).then(response => response.status)
            .catch(err => console.warn(err));
            console.log(response);
            if (response === 200 || response === 201){
                document.getElementById(key).innerText = "bookmark_check";
            }
        } catch (err) {
            setError(err);
        }

        fetchPosts(page);
    };
    
    useEffect(() => {
        fetchPosts(page);
    }, [page]);


    const removeSavedPost = async (key) => {
        const params = {post : key};

        const response = await axios.post(`http://127.0.0.1/api/blog/saved-posts/delete/`, params, {
            headers : {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }).then(response => response.status)

        if (response === 200 || response === 204) {
            setPosts(prevPosts => prevPosts.filter(posts => posts.post.id !== key));
            document.getElementById(key).innerText = "bookmark";
          }

        fetchPosts(page);
    };


    if (error) return <div>Error: {error.message}</div>;

    return (
        <>  
        <div className={`flex padding-25 margin-top-25 post-list-style`}>
            <div className="post-img-box padding-25">
                <img src={post.banner} alt={post.title} className="post-img"></img>
            </div>

            <div className="post-content-box flex flex-column mobile-control space-between">
                <div className="flex flex-row space-between">
                    <h3 className="flex align-center color-dark-blue margin-less"><span className="material-symbols-outlined color-gold">pages</span>{post.title}</h3>
                    <div className="flex space-between">
                        <h5 className="flex align-center color-dark-blue margin-less"><span className="material-symbols-outlined color-gold">timer</span>&nbsp;{post.published_at}</h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {savedPostsId.includes(post.id) ? (
                            <button className="btn padding-less-important" onClick={() => removeSavedPost(post.id)}><span className="material-symbols-outlined" id={post.id}>bookmark_check</span></button>
                        ) : (
                            <button className="btn padding-less-important" onClick={() => saveClickHandle(post.id)}><span className="material-symbols-outlined" id={post.id}>bookmark</span></button>
                        )}
                    </div>
                </div>

                <p className="post-caption color-light-gray">{post.caption}</p>
                <Link to={`/post/${post.slug}`}><div className={`flex justify-content-center align-center margin-less post-btn`} >مشاهده بیشتر&nbsp;<span className="material-symbols-outlined">arrow_circle_left</span></div></Link>
            </div>
        </div>
        </>
    );

    
    function saveClickHandle(key){
        savePost(key);
    }
}

export default Post;