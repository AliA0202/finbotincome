import React from "react";
import "./PromotedPost.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component';
import toast, { Toaster } from 'react-hot-toast';


function PromotedPost({post, key, counter}){
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

    const successNotify = (msg) => {
        toast.success(msg);
      }
    
    
    const errorNotify = (msg) => {
        toast.error(msg);
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
            if (response === 200 || response === 201){
                document.getElementById(key).innerText = "bookmark_check";
                successNotify("پست موردنظر ذخیره گردید!");
            }else{
                errorNotify("خطایی رخ داد");
            }

            console.log("Post: ", response);

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
            successNotify("پست از لیست ذخیره شده ها حذف گردید!");
        }else{
            errorNotify("خطایی رخ داد");
        }

        fetchPosts(page);
    };


    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <div className={`${counter <= 1 && "post-horizontal"} ${counter > 1 && "post-vertical"}`}>
                <div className="post-img-box">
                    <img src={post.banner} alt={post.title} className="post-img"></img>
                </div>

                <div className="post-content-box">
                    <div className="flex flex-row space-between">
                        <h4 className="flex align-center color-dark-blue margin-less"><span className="material-symbols-outlined color-gold">pages</span>{post.title}</h4>

                        <div className="flex space-between">
                            <h5 className="flex align-center color-dark-blue margin-less"><span className="material-symbols-outlined color-gold">timer</span>&nbsp;{post.published_at}</h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {savedPostsId.includes(post.id) ? (
                                <button className="btn padding-less-important margin-less" onClick={() => removeSavedPost(post.id)}><span className="material-symbols-outlined" id={post.id}>bookmark_check</span></button>
                            ) : (
                                <button className="btn padding-less-important margin-less" onClick={() => saveClickHandle(post.id)}><span className="material-symbols-outlined" id={post.id}>bookmark</span></button>
                            )}
                        </div>
                    </div>

                    <p className="post-caption color-light-gray">{post.caption}</p>
                    <Link to={`/post/${post.slug}`}><div className={`flex justify-content-center align-center margin-less post-btn ${counter <= 1 && "btn-banner-active"}`} >مشاهده بیشتر&nbsp;<span className="material-symbols-outlined">arrow_circle_left</span></div></Link>
                </div>
            </div>
        </>
    );

    function saveClickHandle(key){
        savePost(key);
    }
}

export default PromotedPost;