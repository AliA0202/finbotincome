import React, { useState } from "react";
import SignUpForm from "./SignUpForm.js";
import axios from 'axios';
import { useNavigate, Navigate } from "react-router-dom"
import Header from "../Components/Header/Header.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import toast, { Toaster } from 'react-hot-toast';
import Referrals from "./dashboard/Referrals.js";


const FormValidators = require("./validate.js");
const validateSignUpForm = FormValidators.validateSignUpForm;
const zxcvbn = require("zxcvbn");


function SignUpContainer() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pwconfirm, setPwconfirm] = useState("");
  const [score, setScore] = useState("0");
  const [passBtn, setPassBtn] = useState({btnTxt: "نمایش", type: "password"});
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [referralCode, setReferralCode] = useState("");


  const notify_success = (msg) => {
    toast.success(msg);
    setSuccessMsg(null);
  };

  
  const notify_error = (msg) => {
    toast.error(msg);
    setErrorMsg(null);
  };



  function handleNameChange(event) {
    setUsername(event.target.value);
    setPwconfirm()
  }

  function handleReferralCodeChange(event) {
    setReferralCode(event.target.value);
  }

  const sleeped = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const referralHandleSubmit = (event) => {
    event.preventDefault();
    const params = {referral_code : referralCode}
    const response = axios
        .post("http://127.0.0.1/api/accounts/referrals-user/create/", params, {
            headers : {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }).then(async res =>  {
            if (res.status === 200 || res.status === 201){
                notify_success("از انتخاب شما سپاس گذاریم. کد رفرال شما با موفقیت ثبت گردید");
                await sleeped(3000);
                navigate('/dashboard');
            }else{
              notify_error("درخواست شما به دلایل نامعلوم با خطا مواجه شده است، دوباره امتحان کنید");
            }
        })
        .catch(error => {
            if (error.response.status === 404){
                notify_error("کد رفرال نامعتبر");
            } else if (error.response.status === 406) {
              notify_error("این کاربر قبلا با کد دعوت دیگری وارد شده است!");
            }else{
                notify_error("درخواست شما به دلایل نامعلوم با خطا مواجه شده است، دوباره امتحان کنید");
            }
        });
  }


  function pwHandleChange(event) {
    if(event.target.name === "pwconfirm") {
      setPwconfirm(event.target.value);
    }
    else {
      setPassword(event.target.value);
    }
    if (event.target.value === "") {
      setScore(null);
    } else {
      let pw = zxcvbn(event.target.value);
      setScore(pw.score + 1);
    }
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSleep = async () => {
    await sleep(3000);
  };

  const referralsOnClose = () => {
    setIsSignedUp(false);
    return <Navigate to='/dashboard' />
  }


  function submitSignup() {
    var params = { username: username, password: password};
    axios
      .post("http://127.0.0.1/api/accounts/signup/", params)
      .then(res => {
        let params = { username: username, password: password }
        axios
            .post("http://127.0.0.1/api/accounts/login/", params)
            .then(res => {
                localStorage.token = res.data.token;
                localStorage.isAuthenticated = true;
                notify_success("شما با موفقیت عضو شدید");
                setIsSignedUp(true);
              })
            .catch(error => {
                if (error.response) {
                  setErrorMsg(error.response.data.non_field_errors);
                } else if (error.request) {
                  setErrorMsg(error.request);
                } else {
                  setErrorMsg(error.message);
                }
                return <Navigate to='/signup' />
            })
      })
      .catch(error => {
        if (error.response) {
            if (error.response.status === 406){
              setErrorMsg(error.response.data.error);
            }else if(error.response.status === 500){
              setErrorMsg("خطای غیر منتظره ای رخ داد!");
            }else{
              setErrorMsg(error.response.data.non_field_errors);
            };
        } else if (error.request) {
          setErrorMsg(error.request);
        } else {
          setErrorMsg(error.message);
        }
      });
  }

  function validateForm(event) {
    event.preventDefault();
    let payload = validateSignUpForm({ username, password, pwconfirm });
    if (payload.success) {
        submitSignup();
    } 
    else {
      let error = payload.message;
      if (errorMsg === null) {
        setErrorMsg(error);
      }
    }
  }

  function pwMask(event) {
    event.preventDefault();
    setPassBtn(
        passBtn.type= passBtn.type === "password" ? "input" : "password",
        passBtn.btnTxt= passBtn.btnTxt === "show" ? "hide" : "show"
    );
  }


  if ((localStorage.getItem('token')) && (isSignedUp === false)){
    return <Navigate to='/dashboard' />
  }

  return (
    <>
    <Header></Header>
    
    <Toaster position="top-left" reverseOrder={false} />

    { isSignedUp && <Referrals onClose={referralsOnClose} referralHandleSubmit={referralHandleSubmit} handleReferralCodeChange={handleReferralCodeChange} referralCode={referralCode} />}

    <div className="height-100-inmobile"></div>
    <div id="control-space"></div>
    <div className="flex align-center justify-content-center height-100vh" id="form-signup">
      <SignUpForm
        onSubmit={validateForm}
        onUsrChange={handleNameChange}
        onPwChange={pwHandleChange}
        score={score}
        pwMask={pwMask}
        pwconfirm={pwconfirm}
        username={username}
        password={password}
        passBtn={passBtn}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
      />
    </div>

    <Footer></Footer>

    </>
  );
}

export default SignUpContainer;
