import React from "react";
import "./Footer.css";


function Footer(){
    return(
        <>
            <div className="footer flex flex-row space-between padding-25">
                <div className="footer-capsule">
                    <h2 className="flex align-center footer-capsule-header"><span class="material-symbols-outlined">sync</span>&nbsp;همگام سازی با سایر پلتفرم ها</h2>
                    <div className="white-line"></div>
                    <a href="#" className="footer-link flex align-center btn-footer">
                        <img src={process.env.PUBLIC_URL + "/static/images/icon/telegram.png"} alt="telegram icon" className="footer-icon-btn"></img>
                        اتصال به ربات تلگرام</a>
                    <a href="#" className="footer-link flex align-center btn-footer">
                    <img src={process.env.PUBLIC_URL + "/static/images/logo.png"} alt="Finbot logo" className="footer-icon-btn"></img>
                    رفتن به اپلیکیشن (به زودی)</a>
                </div>

                <div className="footer-capsule flex flex-column">
                    <h2 className="flex align-center footer-capsule-header"><span class="material-symbols-outlined">call_received</span>&nbsp;کوتاه کننده لینک</h2>
                    <div className="white-line"></div>
                    <a href="#" className="footer-link flex align-center"><span class="material-symbols-outlined">link</span>&nbsp;خرید عضویت ویژه</a>
                    <a href="#" className="footer-link flex align-center"><span class="material-symbols-outlined">link</span>&nbsp;مطالب رایگان</a>
                    <a href="#" className="footer-link flex align-center"><span class="material-symbols-outlined">link</span>&nbsp;پست های غیر رایگان</a>
                    <a href="#" className="footer-link flex align-center"><span class="material-symbols-outlined">link</span>&nbsp;ارتباط با ما</a>
                    <a href="#" className="footer-link flex align-center"><span class="material-symbols-outlined">link</span>&nbsp;درباره ما</a>
                </div>

                <div className="footer-capsule credentials">
                    <h2 className="flex align-center footer-capsule-header"><span class="material-symbols-outlined">editor_choice</span>&nbsp;اعتبارنامه ها</h2>
                    <div className="white-line"></div>
                    <img src={process.env.PUBLIC_URL + "/static/images/enamad.png"} alt="enamad" className="footer-img"></img>
                    <img src={process.env.PUBLIC_URL + "/static/images/ekkkm.png"} alt="ekkkm" className="footer-img"></img>
                    <img src={process.env.PUBLIC_URL + "/static/images/zarinpal.png"} alt="zarinpal" className="footer-img"></img>
                </div>
            </div>

        </>
    );
}

export default Footer;