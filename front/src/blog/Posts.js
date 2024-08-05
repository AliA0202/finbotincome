import React from "react";
import { Link } from 'react-router-dom';
import "./style.css";

function PostInList(post) {
    return (
        <Link to={`/post/${post.post.slug}`}>
            <div className="loginBox">

                <img src={post.post.banner} alt={post.post.title}></img>
                <h1>{post.post.title}</h1>
                <p>{post.post.caption}</p>
            </div>
        </Link>
    )
}

export default PostInList;