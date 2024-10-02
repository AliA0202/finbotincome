import React from "react";
import "./style.css";
const EditForm = ({
    firstName,
    lastName,
    email,
    phone,
    image,
    imageUrl,
    onFNchange,
    onLNchange,
    onImageChange,
    onEmailchange,
    onPhonechange,
    onSubmit,
    closeClick
}) => {
    return (

        <div className="flex justity-content-center flex-column align-center form-box margin-bottom-25px">
            <div className="flex flex-start width-full padding-right-45">
                    <button type="button" className="btn-menu" id="btn-menu" onClick={closeClick}><img src={process.env.PUBLIC_URL + "/static/images/icon/close.png"} alt="Menu" width="40" height="40"></img></button>
            </div>
            <h1 className="color-dark-blue">ویرایش پروفایل</h1>
            { imageUrl ? (
                <div>
                <img src={imageUrl} alt="Profile" className="img-responsive-md rounded-sm" />
                </div>
            ) : (
                <span></span>
            )}

            <form onSubmit={onSubmit}>
                <label className="label  color-light-blue-sky" htmlFor="first_name">
                    نام:
                </label>
                <input type="text" name="first_name" id="first_name" className="txt-input" value={firstName} onChange={onFNchange} />
                
                <label className="label  color-light-blue-sky" htmlFor="last_name">
                    نام‌خانوادگی:
                </label>
                <input type="text" name="last_name" id="last_name" className="txt-input" value={lastName} onChange={onLNchange} />
                
                <label className="label  color-light-blue-sky" htmlFor="phone">
                    شماره تماس:
                </label>
                <input type="text" name="phone" id="phone" className="txt-input" value={phone} onChange={onPhonechange} />
                
                <label className="label  color-light-blue-sky" htmlFor="email">
                    ایمیل:
                </label>
                <input type="email" name="email" id="email" className="txt-input" value={email} onChange={onEmailchange} />
                
                <label className="label  color-light-blue-sky" htmlFor="image">
                    تصویر پروفایل:
                </label>
                <input type="file" accept="image/*" name="image" id="image" className="txt-input" onChange={onImageChange}/>

                <button
                    className="signUpSubmit"
                    type="submit"
                >ویرایش</button>
            </form>
        </div>

    )
}

export default EditForm;