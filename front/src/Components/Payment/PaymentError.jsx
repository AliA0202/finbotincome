import React from "react";
import './Payment.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from 'react-router-dom';


function PaymentError(){
    return (
        <>
            <Header></Header>
                <div className="height-200"></div>

                <div className="flex flex-row justify-content-center align-center height-100vh">
                    <div className="max-width-800 flex flex-column justify-content-center align-center">
                        <h2>خطایی رخ داد! پرداخت ناموفق</h2>
                        <div className="danger-card">
                            <h4>کد شما نامعتبر می باشد و یا خطایی از سمت سرور رخ داده است!</h4>
                            <p className="text-justify">درصورت کسر وجه از حساب شما و عدم بازپرداخت آن، میتوانید این مورد را از طریق تیکت با پشتیبانی در ارتباط بگذارید.</p>
                        </div>
                        <br></br>
                        <Link to={`/dashboard`}><div className={`flex justify-content-center align-center margin-less post-btn`} >رفتن به پنل کاربری</div></Link>
                    </div>
                </div>
            <Footer></Footer>
        </>
    );
}

export default PaymentError;