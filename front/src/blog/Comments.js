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
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more comments</p>}
        >
            {comments.map((comment) => (
                <div className="loginBox" key={comment.user.username}>
                    <span>
                        <img src={comment.user.image} alt={comment.user.username} />
                        <p>{`${comment.user.first_name} ${comment.user.last_name}`}</p>
                    </span>
                    <p>{comment.caption}</p>
                </div>
            ))}
        </InfiniteScroll>
    );
}

export default Comments;