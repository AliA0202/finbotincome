import React from "react";
import "./style.css";


const LoginForm = ({
    onUNChange,
    onPWChange,
    onSubmit,
    username,
    password
}) => {
    return (
        
        <div className="flex justity-content-center flex-column align-center form-box">
            <img src={process.env.PUBLIC_URL + "/static/images/icon/user.png"} alt="user logo" width="200"></img>
            <h1 className="color-dark-blue">ورود</h1>
            <form onSubmit={onSubmit}>
                <label className="label">
                    نام کاربری:
                </label>
                <input type="text" name="username" className="txt-input" value={username} onChange={onUNChange} />
                
                <label className="label">
                    گذرواژه:
                </label>
                <input type="password" name="password" className="txt-input" value={password} onChange={onPWChange} />
                
                <button
                    type="submit"
                    className="signUpSubmit"
                >ورود</button>


                <p className="flex justify-content-center">
                    ثبت نام نکرده اید؟ <br />
                    <a href={"http://127.0.0.1/signup"}>برای ایجاد حساب کاربری کلیک کنید</a>
                </p>

            </form>
        </div>

    )
}

export default LoginForm;