import React from "react";
import PasswordStr from "./PasswordStr";
import "./style.css";
import toast, { Toaster } from 'react-hot-toast';


const SignUpForm = ({
    onSubmit,
    username,
    password,
    pwconfirm,
    score,
    type,
    pwMask,
    onPwChange,
    onUsrChange,
    passBtn,
    errorMsg,
    setErrorMsg
}) => {

    const notify = (msg) => {
        toast.error(msg);
        setErrorMsg(null);
    };

    return (
        <div className="flex justity-content-center flex-column align-center form-box">
            { errorMsg ? <>
                {notify(errorMsg)}
                </> : null}

            <img src={process.env.PUBLIC_URL + "/static/images/icon/user.png"} alt="user logo" width="200"></img>
            <h1 className="color-dark-blue">عضویت</h1>
            <Toaster position="top-left" reverseOrder={false} />

           
            <form onSubmit={onSubmit}>
                
                <label className="label" htmlFor="pwconfirm">
                    نام کاربری
                </label>
                <input type="text" name="username" value={username} onChange={onUsrChange} className="txt-input"/>
                
                <label className="label" htmlFor="pwconfirm">
                    گذرواژه
                </label>
                <input type={passBtn.type} name="password" value={password} onChange={onPwChange}  className="txt-input"/>

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


                <label className="label" htmlFor="pwconfirm">
                    تکرار گذرواژه
                </label>
                <input type={type} name="pwconfirm" id="pwconfirm" value={pwconfirm} onChange={onPwChange}  className="txt-input"/>

                <button
                    className="signUpSubmit"
                    color="primary"
                    type="submit"
                >عضویت
                </button>
            </form>

            <p className="flex justify-content-center">
                آیا از قبل حساب دارید؟ <br />
                <a href="http://127.0.0.1/login" className="flex align-center"><span class="material-symbols-outlined">login</span>&nbsp;وارد آن شوید</a>
            </p>
        </div>
    );
};

export default SignUpForm;
