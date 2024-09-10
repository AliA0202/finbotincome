import React from "react";
import "./Posts.css";
import PromotedPost from "./PromotedPost/PromotedPost";
import { useEffect, useState } from "react";
import axios from 'axios';




function Posts({boxTitle}){
    const [promotedPosts, setPromotedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let count = 0;

    useEffect(() => {
        fetchPromoted();
    }, []);


    const fetchPromoted = async (page = 1) => {
        try {
            const response = await axios.get(`http://127.0.0.1/api/blog/promoted/`);
            setPromotedPosts(response.data.results);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err);
        }
    };

    
    
    return (
        <>  
            

            <div className="padding-25">
                {boxTitle && 
                <h1 className="color-dark-blue flex justify-content-center align-center text-control"><span class="material-symbols-outlined color-gold">fiber_new</span>&nbsp;{boxTitle}</h1>
                }

                <div className="flex flex-row mobile-control flex-wrap">
                {
                    promotedPosts.map((post) => (
                        <PromotedPost post={post} key={post.slug} counter={count=count+1}></PromotedPost>
                    ))
                }
                </div>
            </div>
        </>
    );

}

export default Posts;