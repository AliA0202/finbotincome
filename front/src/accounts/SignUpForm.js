import React from "react";
import PasswordStr from "./PasswordStr";
import "./style.css";

const SignUpForm = ({
    onSubmit,
    username,
    password,
    email,
    phone,
    pwconfirm,
    score,
    btnTxt,
    type,
    pwMask,
    onPwChange,
    onPhoneChange,
    onUsrChange,
    onEmailChange,
    passBtn,
    firstName,
    lastName,
    onLNchange,
    onFNchange
}) => {
    return (
        <div className="loginBox">
            <h1>Sign Up</h1>
            <form onSubmit={onSubmit}>
                <label>
                    username:
                    <input type="text" name="username" value={username} onChange={onUsrChange} />
                </label>
                <br/>
                <br/>
                <label>
                    phone number:
                    <input type="text" name="phone" value={phone} onChange={onPhoneChange} />
                </label>
               <br/>
               <br/>
                <label>
                    email:
                    <input type="email" name="email" value={email} onChange={onEmailChange} />
                </label>
                <br/>
                <br/>
                <label>
                    نام:
                    <input type="text" name="first_name" value={firstName} onChange={onFNchange} />
                </label>
                <br/>
                <br/>
                <label>
                    نام‌خانوادگی:
                    <input type="text" name="last_name" value={lastName} onChange={onLNchange} />
                </label>
                <br/>
                <br/>
                <label>
                    password:
                    <input type={passBtn.type} name="password" value={password} onChange={onPwChange} />
                </label>
                <br/>
                <br/>
                <div className="pwStrRow">
                    {score >= 1 && (
                        <div>
                            <PasswordStr score={score} />
                            <button
                                className="pwShowHideBtn"
                                onClick={pwMask}
                                style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)' }}>
                                {passBtn.btnTxt}
                            </button>
                        </div>
                    )}
                </div>
                <br/>
                <br/>
                <label>
                    password:
                    <input type={type} name="pwconfirm" value={pwconfirm} onChange={onPwChange} />
                </label>

                <br />
                <button
                    className="signUpSubmit"
                    color="primary"
                    type="submit"
                >submit
                </button>
            </form>
            <p>
                Aleady have an account? <br />
                <a href="http://127.0.0.1/login">Log in here</a>
            </p>
        </div>
    );
};

export default SignUpForm;
