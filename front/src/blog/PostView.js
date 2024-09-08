import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Comments from './Comments.js'
import DOMPurify from 'dompurify';
import Header from "../Components/Header/Header.jsx";
import Footer from "../Components/Footer/Footer.jsx";
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
            <Header></Header>
            <div className="height-200"></div>


            <div className="padding-25 flex flex-column justify-content-center align-center">
                <div className="img-responsive">
                    <div className="flex flex-column mobile-control justify-content-center">
                        <img src={post.banner} className="img-responsive img-radius" alt={post.title}></img>
                        <h1 className="color-dark-blue">{post.title}</h1>
                        <p className="text-justify color-light-gray">{post.caption}</p>
                    </div>
                    
                    <div style={{ direction: 'rtl'}} className="post-content" id="post-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />

                    <form method="post">
                        <h2 className="color-dark-blue">افزودن نظر</h2>
                        <textarea className="textarea" placeholder="توضیحات خود را اضافه کنید تا پس از بررسی منتشر گردد..."></textarea>
                        <input type="submit" value="ثبت نظر" className="signUpSubmit"></input>
                    </form>

                    <div className="flex flex-row justify-content-center">
                        <Comments slug={post.slug} />
                    </div>
                </div>
            </div>
            

            <Footer></Footer>
        </>)
}

export default PostView;
