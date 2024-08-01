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
        
        <div className="loginBox">
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <label>
                    username:
                    <input type="text" name="username" value={username} onChange={onUNChange} />
                </label>
                <br />
                <br />
                <label>
                    password:
                    <input type="password" name="password" value={password} onChange={onPWChange} />
                </label>
                <br />
                <br />
                <br />
                <button
                    type="submit"
                >submit</button>
                <p>
                    ثبت نام نکرده اید؟ <br />
                    <a href={"http://127.0.0.1:1337/signup"}>برای ایجاد حساب کاربری کلیک کنید</a>
                </p>
            </form>
        </div>

    )
}

export default LoginForm;