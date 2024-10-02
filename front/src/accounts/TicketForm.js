import React from "react";
import "./style.css";


const TicketForm = ({
    title,
    caption,
    titleChange,
    captionChange,
    onSubmit,
    ticketCloseClick
}) => {
    return (
        
        <div className="flex justity-content-center flex-column align-center form-box margin-bottom-150">
            <div className="flex flex-start width-full padding-right-45">
                <button type="button" className="btn-menu width-full" id="btn-menu-ticket" onClick={ticketCloseClick}><img src={process.env.PUBLIC_URL + "/static/images/icon/close.png"} alt="Menu" width="40" height="40"></img></button>
            </div>
            <h1 className="color-dark-blue">ارسال تیکت</h1>
            <form onSubmit={onSubmit}>
                <label className="label  color-light-blue-sky">
                    عنوان:
                </label>
                <input type="text" name="title" className="txt-input" value={title} onChange={titleChange}/>
                
                <label className="label  color-light-blue-sky">
                    توضیحات:
                </label>
                <textarea name="caption" value={caption} className="txt-input text-area" onChange={captionChange}></textarea>                
                <button type="submit" className="signUpSubmit">ثبت</button>
            </form>
        </div>

    )
}

export default TicketForm;