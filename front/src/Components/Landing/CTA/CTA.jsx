import React from "react";
import './CTA.css';
import Button from '../../Button/Button';

function CTA(){
    return(
        <>
            <div className="flex flex-row space-around mobile-control padding-25 cta">
                <div className="cta-img-box padding-25">
                    <img src={process.env.PUBLIC_URL + "/static/images/cta.png"} alt="CTA Image" className="cta-img img-responsive"></img>
                </div>

                <div className="cta-content flex flex-column align-center justify-content-center padding-25">
                    <form className="cta-form">
                        <h1 className="color-dark-blue text-control mobile-control mobile-center">دریافت مشاوره رایگان</h1>
                        <h4 className="cta-text color-light-gray txt-18">شماره تماس خود را وارد کنید تا همکاران ما در کوتاه ترین مدت با شما تماس بگیرند و شما را راهنمایی کنند.</h4>
                        
                        <div className="mobile-inline">
                            <input type="phone" id="phone-cta" name="phone-cta" placeholder="0901..." className="cta-txt-box"></input>
                            <Button Type="submit" buttonType="btn-cta" buttonText="ثبت"></Button>
                        </div>
                    </form>

                </div>

            </div>
        </>
    );
}

export default CTA;