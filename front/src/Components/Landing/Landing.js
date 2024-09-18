import { useEffect, useState } from "react";
import axios from 'axios';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Slider from "./Slider/Slider";
import Categories from "./Categories/Categories";
import Posts from "../Posts/Posts";
import Blog from "../Blog/Blog";
import Comments from "./Comments/Comments";
import CTA from "./CTA/CTA";


function Landing() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async (page = 1) => {
    const response = await axios.get(`http://127.0.0.1/api/blog/categorylist/`);
    setCategories(response.data.results);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div id="parent">
        <Header></Header>
        <Slider></Slider>
        <Categories Header="خدمات ما" categoryList={categories} onFilter={null}></Categories>
        <Posts boxTitle={""} ></Posts>
        <Comments></Comments>
        <Posts boxTitle="آخرین مطالب"></Posts>
        <CTA></CTA>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Landing;