import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import "./style.css";
import toast, { Toaster } from 'react-hot-toast';




const Comments = (slug) => {
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [caption, setCaption] = useState("");

    useEffect(() => {
        fetchComments(page);
    }, [page]);

    const fetchComments = async (page) => {

        const response = await axios.post(`http://127.0.0.1/api/blog/comments/?page=${page}`, slug);
        const data = response.data;
        setComments((prevComments) => [...prevComments, ...data.results]);
        if (!data.next) {
            setHasMore(false);
        }
    }

    function captionChange(event) {
        setCaption(event.target.value);
    }

    function submitComment(event) {
        event.preventDefault();
        const params = { post: slug.slug, caption: caption };
        if(! localStorage.getItem('token')){
            errorNotify("برای گذاشتن نظر ابتدا ثبت نام کرده یا به اکانت خود وارد شوید");
            return;
        }
        axios.post(`http://127.0.0.1/api/blog/comments/create/`, params, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }).then(response => {
            if (response.status === 200 || response.status === 204|| response.status === 201) {
                const newComment = response.data;
                if(newComment.user.image !== null){
                    newComment.user.image = process.env.PUBLIC_URL + newComment.user.image;
                }
                setComments((prevComments) => [newComment, ...prevComments]);
                setCaption("");
                successNotify("نظر شما با موفقیت ثبت گردید!");            }
        })
            .catch(error => {
                if (error.response) {
                    errorNotify(error.response.data.non_field_errors);
                } else if (error.request) {
                    errorNotify(error.request);
                } else {
                    errorNotify('Error', error.message);
                }
            })

    }

    const successNotify = (msg) => {
        toast.success(msg);
    }

    
    const errorNotify = (msg) => {
        toast.error(msg);
    }

    return (
        <>
            <Toaster position="top-left" reverseOrder={false} />

            <div className="margin-top-25 padding-25 width-100-mobile">
                <form onSubmit={submitComment} className="flex flex-column mobile-control bg-white rounded create-comment-box">
                    <div className="padding-25 flex justify-content-center flex-column align-center width-100-mobile">
                        <h2 className="color-dark-blue">افزودن نظر</h2>
                        <textarea className="textarea" placeholder="توضیحات خود را اضافه کنید تا پس از بررسی منتشر گردد..." onChange={captionChange} name="caption" value={caption}></textarea>
                        <div className="full-width flex flex-end mobile-center">
                            <input type="submit" value="ثبت نظر" className="signUpSubmit"></input>
                        </div>
                    </div>
                </form>
            </div>

            <InfiniteScroll
                dataLength={comments.length}
                next={() => setPage((prevPage) => prevPage + 1)}
                hasMore={hasMore}
                loader={<h4>در حال بارگذاری</h4>}
                endMessage={<p>نظر بیشتری برای نمایش وجود ندارد...</p>}
            >
                <div className='flex flex-row flex-wrap justify-content-center mobile-control overflow-x-scroll'>
                {comments.map((comment) => (
                    <div className="flex comment-card flex-column align-center justify-content-center padding-25" key={comment.id}>
                        <div className='flex flex-row align-center comment-title'>

                            <div className='flex flex-row align-center flex-between width-full'>
                                <div className='flex align-center flex-row'>
                                    {comment.user.image === null ? (
                                        <img src={process.env.PUBLIC_URL + '/static/images/icon/user.png'} alt={comment.user.username} className='img-comment'></img>
                                    ) : (
                                        <img src={comment.user.image} alt={comment.user.username} className='img-comment'></img>
                                    )}
                                    <p className='font-bold margin-right-15'>{`${comment.user.first_name} ${comment.user.last_name}`}</p>
                                </div>

                                <div className='flex flex-end margin-right-5'>
                                    <small className='font-bold bg-dark-blue color-white rounded padding-side'>{comment.written_at}</small>
                                </div>
                            </div>

                        </div>
                        <hr></hr>
                        <div className='flex flex-row comment-card-caption align-center flex-start'>
                            <p className='text-justify flex flex-start width-full'>{comment.caption}</p>
                        </div>
                    </div>
                ))}
                </div>
            </InfiniteScroll>
        </>
    );
}

export default Comments;
