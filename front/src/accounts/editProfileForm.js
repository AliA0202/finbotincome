import React from "react";
import "./style.css";
const EditForm = ({
    firstName,
    lastName,
    image,
    onFNchange,
    onLNchange,
    onImageChange,
    onSubmit
}) => {
    return (
        
        <div className="loginBox">
            <h1>ویرایش پروفایل</h1>
            <br />
            <br />
            <br />
            <img src={image}></img>
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
                    عکس پروفایل:
                    <input type="file" accept="image/*" name="image" value={image} onChange={onImageChange} />
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