import React from "react";
import "./Posts.css";
import Post from "./Post/Post";
import ReactPaginate from 'react-paginate';


function PostList({posts, boxTitle}){
    return (
        <>  
            

            <div className="padding-25">
                {boxTitle && 
                <h1 className="color-dark-blue flex justify-content-center align-center text-control"><span class="material-symbols-outlined color-gold">fiber_new</span>&nbsp;{boxTitle}</h1>
                }

                {
                    posts.map((post) => (
                        postHandle(post)
                    ))
                } 
            </div>

            <ReactPaginate
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={Math.ceil(totalCount / 10)} // Adjust based on your PAGE_SIZE
                previousLabel="< Previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
        </>
    );

    function postHandle(post){
        if (post.is_promoted === false){
            return <Post post={post} key={post.slug}></Post>
        }
    }
}

export default PostList;