import React from "react";
import "./Comments.css";




function Comments(){
    return (
        <>
            <div className="comments-container">
                <div className="flex flex-row justify-content-center mobile-control space-bottom-mobile-30">
                    <div className="title-line"></div>
                    <h1 className="flex justify-content-center color-dark-blue text-control">با ارزش ترین دارایی ما شما هستید!</h1>
                    <div className="title-line"></div>
                </div>
            <div className="flex padding-25 flex-row commments-box">
                <div className={`flex flex-column space-between align-center padding-25 comments-card`}>
                        <img src={process.env.PUBLIC_URL + "/static/images/p1.jpg"} alt="user profile" className="comments-img"></img>
                        <h3 className="color-dark-blue">رضا نریمانی</h3>
                        <div className="flex flex-start width-full"><span class="material-symbols-outlined color-dark-blue">format_quote</span></div>
                        <p className="comments-caption color-light-gray">با سلام بهترین دوره ای بود که تاکنون تونستم شرکت کنم. خیلی راضی هستم  و صمیمانه از تیم زحمت کش فین بات قدردانی می کنم.</p>
                        <div className="flex flex-end width-full"><span class="material-symbols-outlined color-dark-blue">format_quote</span></div>
                </div>

                <div className={`flex flex-column space-between align-center padding-25 comments-card`}>
                        <img src={process.env.PUBLIC_URL + "/static/images/p2.jpg"} alt="user profile" className="comments-img"></img>
                        <h3 className="color-dark-blue">نگار درینژاد</h3>
                        <div className="flex flex-start width-full"><span class="material-symbols-outlined color-dark-blue">format_quote</span></div>
                        <p className="comments-caption color-light-gray">با سلام بهترین دوره ای بود که تاکنون تونستم شرکت کنم. خیلی راضی هستم  و صمیمانه از تیم زحمت کش فین بات قدردانی می کنم.</p>
                        <div className="flex flex-end width-full"><span class="material-symbols-outlined color-dark-blue">format_quote</span></div>
                </div>

                <div className={`flex flex-column space-between align-center padding-25 comments-card`}>
                        <img src={process.env.PUBLIC_URL + "/static/images/p3.jpg"} alt="User profile" className="comments-img"></img>
                        <h3 className="color-dark-blue">علیرضا</h3>
                        <div className="flex flex-start width-full"><span class="material-symbols-outlined color-dark-blue">format_quote</span></div>
                        <p className="comments-caption color-light-gray">با سلام بهترین دوره ای بود که تاکنون تونستم شرکت کنم. خیلی راضی هستم  و صمیمانه از تیم زحمت کش فین بات قدردانی می کنم.</p>
                        <div className="flex flex-end width-full"><span class="material-symbols-outlined color-dark-blue">format_quote</span></div>
                </div>

                <div className={`flex flex-column space-between align-center padding-25 comments-card`}>
                        <img src={process.env.PUBLIC_URL + "/static/images/p4.jpg"} alt="User profile" className="comments-img"></img>
                        <h3 className="color-dark-blue">نسترن یکتاپور</h3>
                        <div className="flex flex-start width-full"><span class="material-symbols-outlined color-dark-blue">format_quote</span></div>
                        <p className="comments-caption color-light-gray">با سلام بهترین دوره ای بود که تاکنون تونستم شرکت کنم. خیلی راضی هستم  و صمیمانه از تیم زحمت کش فین بات قدردانی می کنم.</p>
                        <div className="flex flex-end width-full"><span class="material-symbols-outlined color-dark-blue">format_quote</span></div>
                </div>

                <div className={`flex flex-column space-between align-center padding-25 comments-card`}>
                        <img src={process.env.PUBLIC_URL + "/static/images/p5.jpg"} alt="User profile" className="comments-img"></img>
                        <h3 className="color-dark-blue">محسن نکویی</h3>
                        <div className="flex flex-start width-full"><span class="material-symbols-outlined color-dark-blue">format_quote</span></div>
                        <p className="comments-caption color-light-gray">با سلام بهترین دوره ای بود که تاکنون تونستم شرکت کنم. خیلی راضی هستم  و صمیمانه از تیم زحمت کش فین بات قدردانی می کنم.</p>
                        <div className="flex flex-end width-full"><span class="material-symbols-outlined color-dark-blue">format_quote</span></div>
                </div>

                <div className={`flex flex-column space-between align-center padding-25 comments-card`}>
                        <img src={process.env.PUBLIC_URL + "/static/images/p6.jpg"} alt="User profile" className="comments-img"></img>
                        <h3 className="color-dark-blue">توماس ادیسون</h3>
                        <div className="flex flex-start width-full"><span class="material-symbols-outlined color-dark-blue">format_quote</span></div>
                        <p className="comments-caption color-light-gray">با سلام بهترین دوره ای بود که تاکنون تونستم شرکت کنم. خیلی راضی هستم  و صمیمانه از تیم زحمت کش فین بات قدردانی می کنم.</p>
                        <div className="flex flex-end width-full"><span class="material-symbols-outlined color-dark-blue">format_quote</span></div>
                </div>
            </div>
            </div>
        </>
    );
}

export default Comments;