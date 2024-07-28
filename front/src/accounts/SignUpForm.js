import React from "react";
import PasswordStr from "./PasswordStr";
import "./style.css";

const SignUpForm = ({
    history,
    onSubmit,
    onChange,
    errors,
    user,
    score,
    btnTxt,
    type,
    pwMask,
    onPwChange
}) => {
    return (
        <div className="loginBox">
            <h1>Sign Up</h1>
            {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
            <form onSubmit={onSubmit}>
                <label>
                    username:
                    <input type="text" name="username" value={user.username} onChange={onChange} />
                </label>
                <br/>
                <br/>
                <label>
                    phone number:
                    <input type="text" name="phone" value={user.phone} onChange={onChange} />
                </label>
               <br/>
               <br/>
                <label>
                    email:
                    <input type="email" name="email" value={user.email} onChange={onChange} />
                </label>
                <br/>
                <br/>
                <label>
                    password:
                    <input type={type} name="password" value={user.password} onChange={onPwChange} />
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
                                {btnTxt}
                            </button>
                        </div>
                    )}
                </div>
                <br/>
                <br/>
                <label>
                    password:
                    <input type={type} name="pwconfirm" value={user.pwconfirm} onChange={onPwChange} />
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
                <a href="/">Log in here</a>
            </p>
        </div>
    );
};

export default SignUpForm;
