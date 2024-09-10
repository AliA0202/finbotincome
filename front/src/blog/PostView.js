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
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const pathParts = location.pathname.split('/');
    const postSlug = pathParts[pathParts.length - 1];

    function captionChange(event){
        setCaption(event.target.value);
    }

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
    

    var timeoutID;
    
    function popupMessage(){
        timeoutID = setTimeout(alert, 3000, 'Comments was created successfully');
    }
    
    function submitComment(key){
        const params = {post : key, caption: caption};
        console.log(params);
        axios.post(`http://127.0.0.1/api/blog/comments/create/`, params, {
            headers : {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }).then(response => {
            if (response.status === 200 || response.status === 204) {
                popupMessage();
            }
            console.log(response);
        })
        .catch(error => {
            if (error.response) {
                alert(error.response.data.non_field_errors);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        })

    }

    

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
                    {post.content === undefined ? (
                        <h4 className="error-content flex align-center flex-column justify-content-center"><h1 className="font-bold margin-less"><span class="material-symbols-outlined">
                        lock
                        </span></h1><p>جهت مشاهده کامل پست و یا همچنین افزودن نظر، باید عضویت ویژه تهیه نمایید! میتوانید از پنل کاربری حساب خود را به عضویت ویژه تبدیل کنید</p></h4>
                    ) : <>
                        <div style={{ direction: 'rtl'}} className="post-content mobile-control justify-content-center flex flex-column" id="post-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />                    
                        
                        <div className="margin-top-75">
                            <form onSubmit={submitComment(post.slug)} className="flex flex-column mobile-control bg-white rounded border-dark-blue">
                                <div className="padding-25 flex justify-content-center flex-column align-center">
                                    <h2 className="color-dark-blue">افزودن نظر</h2>
                                    <textarea className="textarea" placeholder="توضیحات خود را اضافه کنید تا پس از بررسی منتشر گردد..." onChange={captionChange} name="caption" value={caption}></textarea>
                                    <div className="full-width flex flex-end mobile-center">
                                        <input type="submit" value="ثبت نظر" className="signUpSubmit"></input>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                    </>}

                    <div className="flex flex-column margin-top-75 align-center bg-white rounded padding-25 margin-top-75 border-dark-blue">
                            <h2 className="color-dark-blue">نظرات کاربران</h2>
                            <Comments slug={post.slug} />
                    </div>
                </div>
            </div>
            

            <Footer></Footer>
        </>)
}

export default PostView;
