import React from "react";
import "./Support.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CTA from "../Landing/CTA/CTA";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useState } from "react";


function Support(){ 
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
    return (
        <>
            <Header></Header>
            <Toaster position="top-left" reverseOrder={false} />

            <div className="height-100"></div>
            <CTA phoneCTA={phoneCTA} onSubmit={onSubmitCTA} handlePhoneChange={handlePhoneChangeCTA}></CTA>
            <div className="padding-25 mobile-control">
                <div className="flex flex-column align-center justify-content-center padding-25 bg-dark-blue rounded margin-25">
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
                                <h4 className="flex align-center margin-less"><span class="material-symbols-outlined">call</span>&nbsp; تلفن</h4>
                                <p className="font-bold">09019019191</p>
                            </div>
                            <div className="flex flex-row space-between">
                                <h4 className="flex align-center margin-less"><span class="material-symbols-outlined">call</span>&nbsp; تلفن</h4>
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