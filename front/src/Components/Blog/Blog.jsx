import React from "react";
import "./Blog.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Categories from "../Landing/Categories/Categories";
import Button from "../Button/Button";
import PostList from "../Posts/PostList";
import { useEffect, useState } from "react";
import axios from 'axios';
import Posts from "../Posts/Posts";


function Blog(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([])
    const [query, setQuery] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async (page = 1) => {
        try {
            const response = await axios.get(`http://127.0.0.1/api/blog/categorylist/`);
            setCategories(response.data.results);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    function handleQueryChange(event){
        if (query !== null && !query.trim().length){
            setQuery(null);
            return;
        }
        setQuery(event.target.value);
    }
    return (
        <>
            <Header></Header>
            <div className="height-200"></div>

            <Categories Header="بر اساس دسته بندی" categoryList={categories} >
            </Categories>
            
            <div className="flex padding-25 flex-end">
                <form className="cta-form padding-15">
                    <div className="flex space-between padding-25 search-bar mobile-control">
                        <h1 className="color-white flex align-center text-control"><img src={process.env.PUBLIC_URL + "/static/images/icon/eduction.png"}></img>&nbsp;بلاگ آموزشی</h1>
                        <div className="flex align-center">
                            <input type="text" id="search-blog" name="search-blog" placeholder="جستجو کنید..." onChange={handleQueryChange} value={query || ''} className="cta-txt-box"></input>
                        </div>
                    </div>
                </form>
            </div>
            
            <Posts></Posts>
            <PostList query={query} boxTitle="آخرین مطالب"></PostList>
            <Footer></Footer>
        </>
    );
}

export default Blog;