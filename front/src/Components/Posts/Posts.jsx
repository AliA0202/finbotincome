import React from "react";
import "./Posts.css";
import PromotedPost from "./PromotedPost/PromotedPost";



function Posts({postList, boxTitle}){
    var counter = 0;
    
    return (
        <>  
            

            <div className="padding-25">
                {boxTitle && 
                <h1 className="color-dark-blue flex justify-content-center align-center text-control"><span class="material-symbols-outlined color-gold">fiber_new</span>&nbsp;{boxTitle}</h1>
                }

                <div className="flex flex-row mobile-control flex-wrap">
                {
                    postList.map((post) => (
                        postHandle(post)
                    ))
                }
                </div>
            </div>
        </>
    );

    function postHandle(post){
        if (post.is_promoted === true){
            console.log("counter: ", counter);
            counter += 1;
            return <PromotedPost post={post} key={post.slug} counter={counter}></PromotedPost>
        }
    }
}

export default Posts;