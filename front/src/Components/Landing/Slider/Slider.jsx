import React from "react";
import "./Slider.css";


function Slider(){
    return(
        <>
            <div className="flex flex-row slider-box align-center space-around just-slider">
                <div className="flex padding-15">
                    <img src={process.env.PUBLIC_URL + "/static/images/banner.png"} alt="Banner" className="banner-img img-responsive"></img>
                </div>

                <div className="flex flex-column">
                    <h1 className="header-text-banner padding-15 mobile-center text-center-mobile">
                        روی خودت سرمایه گذاری کن!
                    </h1>
                    <h4 className="text-banner padding-15 text-justify-mobile padding-25-mobile">
                        با کمترین ریسک و میزان سرمایه، در بلند مدت و کوتاه مدت از بازار های مالی و کریپتو بیشترین بهره رو ببرید.
                    </h4>

                    <div className="flex flex-row mobile-control">
                        <a href="#" className="btn-banner-active">شروع استفاده از پکیج ها</a>
                        <a href="#" className="btn-banner align-center flex">دیدن پکیج ها و خدمات&nbsp; <span className="material-symbols-outlined">arrow_back</span></a>
                    </div>
                </div>

                <div className="social-box flex flex-column align-end padding-left-45 margin-bottom-25px align-center">
                    <div className="gold-line"></div>
                    <a href="#"><img src={process.env.PUBLIC_URL + "/static/images/icon/telegram.png"} alt="Telegram Icon" className="social-icon"></img></a>
                    <a href="#"><img src={process.env.PUBLIC_URL + "/static/images/icon/instagram.png"} alt="Instagram Icon" className="social-icon"></img></a>
                    <a href="#"><img src={process.env.PUBLIC_URL + "/static/images/icon/whatsapp.png"} alt="Whatsapp Icon" className="social-icon"></img></a>
                </div>

            </div>
        </>
    );
}

export default Slider;