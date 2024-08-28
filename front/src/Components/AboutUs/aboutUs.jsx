import React from "react";
import "./aboutUs.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


function aboutUs(){ 
    return (
        <>
            <Header></Header>
                <div className="height-100"></div>

                <div className="padding-25">
                    <div className="flex flex-row space-around mobile-control">
                        <div className="padding-25">
                            <img src={process.env.PUBLIC_URL + "/static/images/aboutus.png"} className="img-responsive img-shadow"></img>
                        </div>

                        <div className="flex flex-column align-center justify-content-center padding-25">
                            <h2 className="color-dark-blue">اهداف تیم</h2>
                            <p className="text-justify img-responsive color-dark-blue">
                                ما در تیم <span className="font-bold">Finbotincome</span> تمام تلاشمان این است که با گردهم آوری ایده های کارکنان و همچنین تجربه های هر کدام در بازارهای مالی و یا کریپتو، بهترین و مناسب ترین ابزار ها و آموزش ها را در اختیار شما عزیزان بگذاریم تا موفقیت های شما عامل شاد کامی و سر افرازی تیم ما شود.
                            </p>
                        </div>
                    </div>


                    <div className="flex flex-row space-around mobile-control reverse-mobile">
                        <div className="flex flex-column align-center justify-content-center padding-25">
                            <h2 className="color-dark-blue">اعضای تیم</h2>
                            <p className="text-justify img-responsive color-dark-blue">
                                ما در تیم خود تا کنون افتخار همکاری با 16 نفر را داشته ایم، که همه و همه با درنظر گرفتن اهداف شرکت سعی در توانمند سازی و قدرتمند تر کردن خود و در نتیجه عملکرد بهتر سازمان دارند.
                            </p>
                        </div>

                        <div className="padding-25">
                            <img src={process.env.PUBLIC_URL + "/static/images/aboutus1.png"} className="img-responsive img-shadow"></img>
                        </div>

                    </div>


                </div>
            <Footer></Footer>
        </>
    );
}

export default aboutUs;