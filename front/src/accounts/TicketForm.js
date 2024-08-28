import React from "react";
import "./style.css";


const TicketForm = ({
    title,
    caption,
    onSubmit
}) => {
    return (
        
        <div className="flex justity-content-center flex-column align-center form-box">
            <h1 className="color-dark-blue">ارسال تیکت</h1>
            <form onSubmit={onSubmit}>
                <label className="label">
                    عنوان:
                </label>
                <input type="text" name="title" className="txt-input" value={title}/>
                
                <label className="label">
                    توضیحات:
                </label>
                <textarea name="caption" value={caption} className="txt-input text-area"></textarea>                
                <button
                    type="submit"
                    className="signUpSubmit"
                >ارسال</button>
            </form>
        </div>

    )
}

export default TicketForm;