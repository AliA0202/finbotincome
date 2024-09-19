import React from "react";
import './Payment.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from 'react-router-dom';


function PaymentSuccess(){
    return (
        <>
            <Header></Header>
                <div className="height-200"></div>

                <div className="flex flex-row justify-content-center align-center height-100vh">
                    <div className="max-width-800 flex flex-column justify-content-center align-center">
                        <h2>قدر دان انتخاب و اعتماد شما هستیم.</h2>
                        <div className="success-card">
                            <h4>پرداخت شما موفقیت آمیز بود</h4>
                            <p className="text-justify">حساب شما اکنون تبدیل به عضویت ویژه شده است. اکنون می توانید از تمامی پست های آموزشی استفاده نمایید</p>
                        </div>
                        <br></br>
                        <Link to={`/dashboard`}><div className={`flex justify-content-center align-center margin-less post-btn`} >رفتن به پنل کاربری</div></Link>
                    </div>
                </div>
            <Footer></Footer>
        </>
    );
}

export default PaymentSuccess;