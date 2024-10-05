import React from "react";
import { useEffect } from "react";

const Referrals = ({
    onClose,
    referralHandleSubmit,
    handleReferralCodeChange,
    referralCode    
}) => {

    useEffect (() => {
        document.getElementById("pass-str").style.display = "none";
        document.getElementById("pass-str-btn").style.display = "none";
    })

    return (

        <div className="fixed-overlay">
            <form className="popup-form" onSubmit={referralHandleSubmit}>
                <img src={process.env.PUBLIC_URL + "/static/images/referral.png"} className="img-responsive-sm"></img>
                <h2 className="color-dark-blue text-center padding-25-mobile">کد دعوت دارید؟ آن را در کادر زیر وارد نمایید</h2>
                <input type="text" name="referral_code" className="txt-input" onChange={handleReferralCodeChange} value={referralCode} />
                <div className="flex margin-top-25 flex-row space-around mobile-control">
                    <button 
                    className="btn btn-success"
                    color="primary"
                    type="submit">ثبت کد</button>
                    <button type="button" className="btn btn-skip" onClick={onClose}>ادامه</button>
                </div>
            </form>
        </div>
    );
}

export default Referrals;