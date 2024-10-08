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
import { useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


function Blog(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([])
    const [query, setQuery] = useState(null);
    const [listTitle, setListTitle] = useState("آخرین مطالب")
    const [filter, setFilter] = useState(null)
    const location = useLocation();
    const { cat, catID } = location.state || {};


    
    const successNotify = (msg) => {
        toast.success(msg);
    }


    const errorNotify = (msg) => {
        toast.error(msg);
    }
    
    useEffect(() => {
        fetchCategories();
        if (cat && catID){
            setFilter(cat);
            categoryChange(cat, catID)
        }
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
        setQuery(event.target.value);
        const newValue= event.target.value;
        if (!newValue.trim().length && !filter){
            setListTitle(`آخرین مطالب`)
            return;
        }
        if (!newValue.trim().length && filter){
            setListTitle(`نتایج جست‌وجو در دسته‌بندی ${filter}`)
            return;
        }
        if(listTitle != "آخرین مطالب" && listTitle != "نتایج جست‌وجو"){
            setListTitle(`نتایج جست‌وجو در دسته‌بندی ${filter}`)
        }
        else{setListTitle("نتایج جست‌وجو")}
    }

    function categoryChange(category, categoryId){
            if(category == -1){ //there is all category that has the value of -1
                setListTitle(`آخرین مطالب`)
                if(listTitle == `نتایج جست‌وجو در دسته‌بندی ${filter}`){
                    setListTitle(`نتایج جست‌وجو`)
                }
                setFilter(null);
                return
            }
            setFilter(`${categoryId}`)
            setListTitle(`دسته‌بندی ${category}`)
            if(listTitle == "نتایج جست‌وجو"){
                setListTitle(`نتایج جست‌وجو در دسته‌بندی ${category}`)
            }
    }
    return (
        <>
            <Header></Header>
            <Toaster position="top-left" reverseOrder={false} />

            <div className="height-200"></div>

            <Categories Header="بر اساس دسته بندی" categoryList={categories} onFilter={categoryChange} >
            </Categories>
            
            <div className="flex padding-25 flex-end">
                <form className="cta-form padding-15">
                    <div className="flex space-between padding-25 search-bar mobile-control">
                        <h1 className="color-white flex align-center text-control"><img src={process.env.PUBLIC_URL + "/static/images/icon/eduction.png"}></img>&nbsp;بلاگ آموزشی</h1>
                        <div className="flex align-center">
                            <input type="text" id="search-blog" name="search-blog" placeholder="جستجو کنید..." onChange={handleQueryChange} value={query || ''} className="search-txt-box" />
                        </div>
                    </div>
                </form>
            </div>
            
            {query || filter ? <PostList queryString={`${query?`search=${query}&`:""}${filter?`category=${filter}&`:""}`}
            boxTitle={listTitle}></PostList> :
            <div><Posts></Posts> <PostList queryString={query} boxTitle="آخرین مطالب"></PostList></div>} 
            
            
            <Footer></Footer>
        </>
    );
}

export default Blog;