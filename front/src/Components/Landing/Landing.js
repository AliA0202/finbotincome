import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Slider from "./Slider/Slider";
import Categories from "./Categories/Categories";
import Posts from "../Posts/Posts";
import Comments from "./Comments/Comments";
import CTA from "./CTA/CTA";

function Landing(){
    const posts = [
        {
          "postAlignment":"horizontal",
          "postImage" : "/static/images/postOne.jpg",
          "postDate" : "1403/05/06",
          "postFile" : "3",
          "postTitle" : "عنوان پست پین شده اول",
          "postCaption" : "لورم ایپسوم متن ساختگی ای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهن سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
        },
        {
          "postAlignment":"vertical",
          "postImage" : "/static/images/postTwo.jpg",
          "postDate" : "1403/05/06",
          "postFile" : "3",
          "postTitle" : "عنوان پست پین شده اول",
          "postCaption" : "لورم ایپسوم متن ساختگی ای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهن سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
        },
        {
          "postAlignment":"vertical",
          "postImage" : "/static/images/postTree.jpg",
          "postDate" : "1403/05/06",
          "postFile" : "3",
          "postTitle" : "عنوان پست پین شده اول",
          "postCaption" : "لورم ایپسوم متن ساختگی ای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهن سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
        },
        {
          "postAlignment":"vertical",
          "postImage" : "/static/images/postFour.jpg",
          "postDate" : "1403/05/06",
          "postFile" : "3",
          "postTitle" : "عنوان پست پین شده اول",
          "postCaption" : "لورم ایپسوم متن ساختگی ای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهن سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
        }
      ];
    
    
      const postsListStyle = [
        {
          "postAlignment":"list-style",
          "postImage" : "/static/images/postOne.jpg",
          "postDate" : "1403/05/06",
          "postFile" : "3",
          "postTitle" : "عنوان پست پین شده اول",
          "postCaption" : "لورم ایپسوم متن ساختگی ای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهن سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
        },
        {
          "postAlignment":"list-style",
          "postImage" : "/static/images/postTwo.jpg",
          "postDate" : "1403/05/06",
          "postFile" : "3",
          "postTitle" : "عنوان پست پین شده اول",
          "postCaption" : "لورم ایپسوم متن ساختگی ای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهن سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
        },
        {
          "postAlignment":"list-style",
          "postImage" : "/static/images/postTree.jpg",
          "postDate" : "1403/05/06",
          "postFile" : "3",
          "postTitle" : "عنوان پست پین شده اول",
          "postCaption" : "لورم ایپسوم متن ساختگی ای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهن سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
        },
        {
          "postAlignment":"list-style",
          "postImage" : "/static/images/postFour.jpg",
          "postDate" : "1403/05/06",
          "postFile" : "3",
          "postTitle" : "عنوان پست پین شده اول",
          "postCaption" : "لورم ایپسوم متن ساختگی ای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهن سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
        },
        {
          "postAlignment":"list-style",
          "postImage" : "/static/images/postFour.jpg",
          "postDate" : "1403/05/06",
          "postFile" : "3",
          "postTitle" : "عنوان پست پین شده اول",
          "postCaption" : "لورم ایپسوم متن ساختگی ای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهن سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
        },
        {
          "postAlignment":"list-style",
          "postImage" : "/static/images/postFour.jpg",
          "postDate" : "1403/05/06",
          "postFile" : "3",
          "postTitle" : "عنوان پست پین شده اول",
          "postCaption" : "لورم ایپسوم متن ساختگی ای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهن سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
        }
      ];
    
    return (
        <>  
            <div id="parent">
                <Header></Header>
                <Slider></Slider>
                <Categories Header="خدمات ما"></Categories>
                <Posts postList={posts} ></Posts>
                <Comments></Comments>
                <Posts postList={postsListStyle} boxTitle="آخرین مطالب"></Posts>
                <CTA></CTA>
                <Footer></Footer>
            </div>
        </>
    );
}

export default Landing;