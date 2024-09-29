import React, { useState } from "react";
import SignUpForm from "./SignUpForm.js";
import axios from 'axios';
import { useNavigate, Navigate } from "react-router-dom"
import Header from "../Components/Header/Header.jsx";
import Footer from "../Components/Footer/Footer.jsx";



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


  function handleNameChange(event) {
    setUsername(event.target.value);
    setPwconfirm()
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

  function submitSignup() {
    console.log("Signup Called");
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
                return <Navigate to='/dashboard' />
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
            if (error.response.status == 406){
              setErrorMsg(error.response.data.error);
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


  if (localStorage.getItem('token')){
    return <Navigate to='/dashboard' />
  }

  return (
    <>
    <Header></Header>
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
