import React, { useEffect } from "react";
import "./style.css";


const ShowTicketDetail = ({
    title,
    text,
    created,
    ans_text,
    ans_created,
    closeClick,
}) => {
    
    useEffect(() => {
        document.getElementById("ticket-popUp-overlay").style.display = "flex";
        document.getElementById("main").style.display = "none";
        document.getElementById("ticket-btn-menu").style.display = "flex";
    }, []);

    return (
        <div className="overlay" id="ticket-popUp-overlay">
            <div className="flex flex-start width-full padding-right-45">
                <button type="button" className="btn-menu width-full" id="ticket-btn-menu" onClick={closeClick}><img src={process.env.PUBLIC_URL + "/static/images/icon/close.png"} alt="Menu" width="40" height="40"></img></button>
            </div>
            <div className="flex justity-content-center flex-column align-center form-box padding-50">
                <div className="width-full info-card flex flex-column rounded padding-15">
                    <div className="flex flex-row space-between">
                        <h2 className="color-dark-blue">تیکت شما</h2>
                        <h4 className="color-dark-blue date-time-bg">{created}</h4>
                    </div>
                    <div className="gray-line"></div>
                    <div className="flex flex-column padding-25">
                        <h4 className="color-dark-blue">عنوان</h4>
                        <div className="gray-line-sm"></div>
                        <p className="color-light-gray">{title}</p>
                        <h4 className="color-dark-blue">توضیحات</h4>
                        <div className="gray-line-sm"></div>
                        <p className="text-justify color-light-gray">{text}</p>
                    </div>
                </div>                
                <br></br>
                <div  className="width-full info-card flex flex-column rounded padding-15">
                    <div className="flex flex-row space-between">
                        <h2 className="color-dark-blue">پاسخ ادمین</h2>
                        <h4 className="color-dark-blue date-time-bg">{ans_created}</h4>
                    </div>
                    <div className="gray-line"></div>
                    <p className="text-justify color-light-gray padding-25">{ans_text}</p>
                </div>
            </div>
        </div>
    )
}

export default ShowTicketDetail;