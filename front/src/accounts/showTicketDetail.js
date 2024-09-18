import React from "react";
import "./style.css";


const showTicketDetail = ({
    title,
    text,
    created,
    ans_text,
    ans_created,
    closeClick,
}) => {
    return (
        <div className="overlay" id="overlay">
            <div className="flex flex-start width-full padding-right-45">
                <button type="button" className="btn-menu width-full" id="btn-menu" onClick={closeClick}><img src={process.env.PUBLIC_URL + "/static/images/icon/close.png"} alt="Menu" width="40" height="40"></img></button>
            </div>
            <div className="flex justity-content-center flex-column align-center form-box">
                <h2 className="color-dark-blue">{title}&nbsp;{created}</h2>
                <p className="text-justify">{text}</p>
                <br></br>
                <h2 className="color-dark-blue">پاسخ ادمین</h2>
                <p className="text-justify">{ans_text} &nbsp; {ans_created}</p>
            </div>
        </div>
    )
}

export default showTicketDetail;