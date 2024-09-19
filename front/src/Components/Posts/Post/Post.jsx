import React from "react";
import "../PromotedPost/PromotedPost.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from "react";


function Post({post, key}){
    
    const [savedPosts, setSavePost] = useState([]);
    const [error, setError] = useState(null);


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
                        <button className="btn padding-less-important" onClick={() => saveClickHandle(post.id)}><span className="material-symbols-outlined" id={post.id}>bookmark</span></button>
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