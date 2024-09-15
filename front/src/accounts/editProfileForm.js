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
    onSubmit
}) => {
    return (

        <div className="flex justity-content-center flex-column align-center form-box margin-bottom-25px">
            <h1 className="color-dark-blue">ویرایش پروفایل</h1>
            { imageUrl ? (
                <div>
                <img src={imageUrl} alt="Profile" className="img-responsive rounded" />
                </div>
            ) : (
                <span></span>
            )}

            <form onSubmit={onSubmit}>
                <label className="label" htmlFor="first_name">
                    نام:
                </label>
                <input type="text" name="first_name" id="first_name" className="txt-input" value={firstName} onChange={onFNchange} />
                
                <label className="label" htmlFor="last_name">
                    نام‌خانوادگی:
                </label>
                <input type="text" name="last_name" id="last_name" className="txt-input" value={lastName} onChange={onLNchange} />
                
                <label className="label" htmlFor="phone">
                    شماره تماس:
                </label>
                <input type="text" name="phone" id="phone" className="txt-input" value={phone} onChange={onPhonechange} />
                
                <label className="label" htmlFor="email">
                    ایمیل:
                </label>
                <input type="email" name="email" id="email" className="txt-input" value={email} onChange={onEmailchange} />
                
                <label className="label" htmlFor="image">
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