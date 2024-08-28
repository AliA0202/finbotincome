import React, { useState } from "react";
import SignUpForm from "./SignUpForm.js";
import axios from 'axios';
import { useNavigate } from "react-router-dom"
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
    var params = { username: username, password: password};
    axios
      .post("http://127.0.0.1/api/accounts/signup/", params)
      .then(res => {
        localStorage.token = res.data.token;
        localStorage.isAuthenticated = true;
        navigate("/");
      })
      .catch(error => {
        if (error.response) {
            alert(error.response.data.non_field_errors);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
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
      window.alert(error);
    }
  }

  function pwMask(event) {
    event.preventDefault();
    setPassBtn(
        passBtn.type= passBtn.type === "password" ? "input" : "password",
        passBtn.btnTxt= passBtn.btnTxt === "show" ? "hide" : "show"
    );
  }


  return (
    <>
    <Header></Header>
    <div className="flex align-center justify-content-center height-100vh">
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
      />
    </div>

    <Footer></Footer>
    </>
  );
}

export default SignUpContainer;
