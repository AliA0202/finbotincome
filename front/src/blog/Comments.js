import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import "./style.css";

const Comments = (slug) => {
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchComments(page);
    }, [page]);

    const fetchComments = async (page) => {
        
        const response = await axios.post(`http://127.0.0.1/api/blog/comments/?page=${page}`,slug);
        const data = response.data;
        setComments((prevComments) => [...prevComments, ...data.results]);
        if (!data.next) {
            setHasMore(false);
        }
    }

    return (
        <InfiniteScroll
            dataLength={comments.length}
            next={() => setPage((prevPage) => prevPage + 1)}
            hasMore={hasMore}
            loader={<h4>در حال بارگذاری</h4>}
            endMessage={<p>نظر بیشتری برای نمایش وجود ندارد...</p>}
        >
            {comments.map((comment) => (
                <div className="flex comment-card flex-column align-center justify-content-center padding-25" key={comment.user.username}>
                    <div className='flex flex-row align-center flex-start comment-title'>
                        <div>
                            {comment.user.image === null ? (
                                <img src={process.env.PUBLIC_URL + '/static/images/icon/user.png'} alt={comment.user.username} className='img-comment'></img>
                            ): (
                                <img src={comment.user.image} alt={comment.user.username} className='img-comment'></img>
                            )}
                        </div>
                        
                        <div>
                            <p className='font-bold margin-right-15'>{`${comment.user.first_name} ${comment.user.last_name}`}</p>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='flex flex-row align-center flex-start'>
                        <p className='text-justify'>{comment.caption}</p>
                    </div>
                </div>
            ))}
        </InfiniteScroll>
    );
}

export default Comments;
