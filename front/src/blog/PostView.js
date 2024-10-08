import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Comments from './Comments.js'
import DOMPurify from 'dompurify';
import Header from "../Components/Header/Header.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import "./style.css";
import toast, { Toaster } from 'react-hot-toast';


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


    const successNotify = (msg) => {
        toast.success(msg);
    }

    
    const errorNotify = (msg) => {
        toast.error(msg);
    }

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

            <Toaster position="top-left" reverseOrder={false} />

            <div className="height-200"></div>



            <div className="padding-15 flex flex-column justify-content-center align-center">
                <div className="flex flex-column align-center">
                    <div className="flex flex-row mobile-control space-between padding-15">
                        <img src={post.banner} className="img-responsive img-radius" alt={post.title}></img>
                        <div className="flex flex-column padding-25">
                            <h1 className="color-dark-blue">{post.title}</h1>
                            <p className="text-justify color-light-gray">{post.caption}</p>
                        </div>
                    </div>
                    {post.content === undefined ? (
                        <h4 className="error-content flex align-center flex-column padding-15 margin-top-75 justify-content-center"><h1 className="font-bold margin-less"><span class="material-symbols-outlined">
                            lock
                        </span></h1><p>جهت مشاهده کامل پست و یا همچنین افزودن نظر، باید عضویت ویژه تهیه نمایید! میتوانید از پنل کاربری حساب خود را به عضویت ویژه تبدیل کنید</p></h4>
                    ) : <>
                        <hr className="margin-top-75"></hr>
                        <div style={{ direction: 'rtl' }} className="post-content mobile-control padding-15 justify-content-center flex flex-column" id="post-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
                    </>}

                    <div className="flex flex-column margin-top-75 align-center bg-white padding-15 margin-top-75 border-dark-blue comment-box">
                        <Comments slug={post.slug} />
                    </div>
                </div>
            </div>


            <Footer></Footer>
        </>)
}

export default PostView;
