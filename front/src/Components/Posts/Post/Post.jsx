import React from "react";
import "../PromotedPost/PromotedPost.css";
import { Link } from 'react-router-dom';


function Post({post, key}){
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
                        <h5 className="flex align-center color-dark-blue margin-less"><span className="material-symbols-outlined color-gold">video_file</span>&nbsp;0</h5>
                    </div>
                </div>

                <p className="post-caption color-light-gray">{post.caption}</p>
                <Link to={`/post/${post.slug}`}><div className={`flex justify-content-center align-center margin-less post-btn`} >مشاهده بیشتر&nbsp;<span className="material-symbols-outlined">arrow_circle_left</span></div></Link>
            </div>
        </div>
        </>
    );
}

export default Post;