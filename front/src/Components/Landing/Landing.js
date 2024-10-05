import { useEffect, useState } from "react";
import axios from 'axios';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Slider from "./Slider/Slider";
import Categories from "./Categories/Categories";
import Posts from "../Posts/Posts";
import Blog from "../Blog/Blog";
import Comments from "./Comments/Comments";
import Post from "../Posts/Post/Post"
import CTA from "./CTA/CTA";
import toast, { Toaster } from 'react-hot-toast';


function Landing() {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [phoneCTA, setPhoneCTA] = useState("");


  const successNotify = (msg) => {
    toast.success(msg);
  }


  const errorNotify = (msg) => {
    toast.error(msg);
  }

  function handlePhoneChangeCTA (event) {
    setPhoneCTA(event.target.value);
  }

  const onSubmitCTA = async (event) => {
    event.preventDefault();

    const params = {phone : phoneCTA};
    await axios.post("http://127.0.0.1/api/main/cta/create/", params)
    .then(res => {
      successNotify("شماره شما جهت دریافت مشاوره رایگان ثبت گردید.");
    }).catch(error => {
        errorNotify("مشکلی در درخواست شما به وجود آمد");
    })
  }

  const fetchCategories = async (page = 1) => {
    const response = await axios.get(`http://127.0.0.1/api/blog/categorylist/`);
    setCategories(response.data.results);
  }
  const fetchPosts = async () => {
    const response = await axios.get(`http://127.0.0.1/api/blog/posts/?page=1`);
    setPosts(response.data.results);
  }
  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, []);

  return (
    <>
      <div id="parent">
        <Header></Header>
        <Toaster position="top-left" reverseOrder={false} />
        <Slider></Slider>
        <Categories Header="خدمات ما" categoryList={categories} onFilter={null}></Categories>
        <Posts boxTitle={""} ></Posts>
        <Comments></Comments>
        <div className="padding-25">
          {
            <h1 className="color-dark-blue flex justify-content-center align-center text-control"><span class="material-symbols-outlined color-gold">fiber_new</span>&nbsp;آخرین مطالب</h1>
          }
          <div className="flex flex-row mobile-control flex-wrap">
            {
              posts.map((post) => (
                filterPosts(post)
              ))
            }
          </div>
        </div>
        <CTA onSubmit={onSubmitCTA} phoneCTA={phoneCTA} handlePhoneChange={handlePhoneChangeCTA}></CTA>
        <Footer></Footer>
      </div>
    </>
  );
  function filterPosts(post) {
    if (post.is_promoted !== true) {
      return <Post post={post} key={post.slug} ></Post>
    }
  }
}

export default Landing;