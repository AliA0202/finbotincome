import React from "react";
import "./PromotedPost.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from "react";

function PromotedPost({post, key, counter}){

    const [savedPosts, setSavePost] = useState([]);
    const [error, setError] = useState(null);


    const savePost = async (key) => {
        try {
            const params = {post : key};
            console.log(params);
            const response = await axios.get(`http://127.0.0.1/api/blog/saved-posts/create/`, params, {
                headers : {
                    'Authorization' : `Token ${localStorage.getItem('token')}`
                }
            });
            console.log(response);
        } catch (err) {
            setError(err);
        }
    };

    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <div className={`flex padding-25 margin-top-25 ${counter <= 1 && "post-horizontal"} ${counter > 1 && "post-vertical"} space-between mobile-control`}>
                <div className="post-img-box padding-25">
                    <img src={post.banner} alt={post.title} className="post-img"></img>
                </div>

                <div className="post-content-box flex flex-column mobile-control space-between">
                    <div className="flex flex-row space-between">
                        <h3 className="flex align-center color-dark-blue margin-less"><span className="material-symbols-outlined color-gold">pages</span>{post.title}</h3>

                        <div className="flex space-between">
                            <h5 className="flex align-center color-dark-blue margin-less"><span className="material-symbols-outlined color-gold">timer</span>&nbsp;{post.published_at}</h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button className="btn padding-less-important" onClick={saveClickHandle(post)}><span className="material-symbols-outlined">bookmark</span></button>
                        </div>
                    </div>

                    <p className="post-caption color-light-gray">{post.caption}</p>
                    <Link to={`/post/${post.slug}`}><div className={`flex justify-content-center align-center margin-less post-btn ${counter <= 1 && "btn-banner-active"}`} >مشاهده بیشتر&nbsp;<span className="material-symbols-outlined">arrow_circle_left</span></div></Link>
                </div>
            </div>
        </>
    );

    function saveClickHandle(key){
        console.log(key);
        savePost(key);
    }
}

export default PromotedPost;