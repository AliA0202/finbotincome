import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import "./style.css";


function PostView() {
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const pathParts = location.pathname.split('/');
    const postSlug = pathParts[pathParts.length - 1];

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async (page = 1) => {
        try {
            if (localStorage.getItem('token') === null) {

                const response = await axios.get(`http://127.0.0.1/api/blog/${postSlug}`);
                setPost(response.data);
                setLoading(false);
            }
            else {
                const response = await axios.get(`http://127.0.0.1/api/blog/${postSlug}`, {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                });
                setPost(response.data);
                setLoading(false);
            }
        }
        catch (err) {
            setError(err);
            setLoading(false);
        }

    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <div className="loginBox">
                <h1>{post.tile}</h1>
                <img src={post.banner} alt={post.title}></img>
                <p>{post.caption}</p>
            </div>

            <div style={{ direction: 'rtl' }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
        </>)
}

export default PostView;