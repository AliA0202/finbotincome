import React from "react";
import "./Support.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CTA from "../Landing/CTA/CTA";

function Support(){ 
    return (
        <>
            <Header></Header>
            <div className="height-100"></div>
            <CTA></CTA>
            <div className="padding-25">
                <div className="flex flex-column align-center justify-content-center padding-25 bg-dark-blue margin-25 rounded">
                    <h1 className="color-white text-control flex align-center"><img src={ process.env.PUBLIC_URL + "/static/images/icon/mail.png"}></img>&nbsp;تیکتینگ</h1>
                    <p className="text-justify color-white">با رفتن به پنل کاربری میتوانید تیکت جدید ایجاد و یا تیکت های قبلی حساب خود را مشاهده کنید. توجه داشته باشید که باید از قبل حساب کاربری داشته باشید و یا در غیر اینصورت یکی را ایجاد کنید</p>
                    <a href="#" className="btn btn-footer flex align-center"><span class="material-symbols-outlined">dashboard</span>&nbsp;رفتن به پنل کاربری</a>
                </div>

                <div className="height-100"></div>
                <div className="flex flex-row space-between padding-25 mobile-control support-capsule-box">
                    <div className="support-capsule">
                        <h2>اطلاعات تماس</h2>
                        <hr></hr>
                        <div className="flex flex-column padding-25 space-between">
                            <div className="flex flex-row space-between">
                                <p className="flex align-center"><span class="material-symbols-outlined">call</span>&nbsp; تلفن</p>
                                <p className="font-bold">09019019191</p>
                            </div>
                            <div className="flex flex-row space-between">
                                <p className="flex align-center"><span class="material-symbols-outlined">call</span>&nbsp; تلفن</p>
                                <p className="font-bold">09019019191</p>
                            </div>                    </div>
                    </div>

                    
                    <div className="support-capsule">
                        <h2>شبکه های اجتماعی</h2>
                        <hr></hr>

                        <div className="flex flex-row padding-25 space-between">
                            <a href="#"><img src={process.env.PUBLIC_URL + "/static/images/icon/telegram.png"} alt="Telegram Icon" width="50"></img></a>
                            <a href="#"><img src={process.env.PUBLIC_URL + "/static/images/icon/instagram.png"} alt="Instagram Icon" width="50"></img></a>
                            <a href="#"><img src={process.env.PUBLIC_URL + "/static/images/icon/whatsapp.png"} alt="Whatsapp Icon" width="50"></img></a>
                        </div>
                    </div>

                    
                    <div className="support-capsule">
                        <h2>مکان</h2>                    
                        <hr></hr>
                        <p className="flex justify-content-center height-100 align-center">هنوز فعال نشده است</p>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}

export default Support;