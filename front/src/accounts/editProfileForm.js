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

        <div className="loginBox">
            <h1>ویرایش پروفایل</h1>
            <br />
            <br />
            <br />
            <div>
            <img src={imageUrl} alt="Profile" />
            </div>
            <form onSubmit={onSubmit}>
                <label>
                    نام:
                    <input type="text" name="first_name" value={firstName} onChange={onFNchange} />
                </label>
                <br />
                <br />
                <label>
                    نام‌خانوادگی:
                    <input type="text" name="last_name" value={lastName} onChange={onLNchange} />
                </label>
                <br />
                <br />
                <label>
                    شماره تماس:
                    <input type="text" name="phone" value={phone} onChange={onPhonechange} />
                </label>
                <br />
                <br />
                <label>
                    ایمیل:
                    <input type="email" name="email" value={email} onChange={onEmailchange} />
                </label>
                <br />
                <br />
                <label>
                    عکس پروفایل:
                    <input type="file" accept="image/*" name="image" onChange={onImageChange} />
                </label>



                <br />
                <br />
                <br />
                <button
                    type="submit"
                >submit</button>
            </form>
        </div>

    )
}

export default EditForm;