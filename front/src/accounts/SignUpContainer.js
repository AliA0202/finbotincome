import React, { useState } from "react";
import SignUpForm from "./SignUpForm.js";
import axios from 'axios';
import { useNavigate } from "react-router-dom"
const FormValidators = require("./validate.js");
const validateSignUpForm = FormValidators.validateSignUpForm;
const zxcvbn = require("zxcvbn");


function SignUpContainer() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pwconfirm, setPwconfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [score, setScore] = useState("0");
  const [passBtn, setPassBtn] = useState({btnTxt: "show", type: "password"});



  function handleNameChange(event) {
    setUsername(event.target.value);
    setPwconfirm()
  }
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePhoneChange(event) {
    setPhone(event.target.value);
  }
  function handleFirstNameChange(event){
    setFirstName(event.target.value)
  }
  function handleLastNameChange(event){
    setLastName(event.target.value)
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
    var params = { username: username, password: password, email: email, phone: phone , last_name: lastName, first_name: firstName};
    axios
      .post("http://127.0.0.1:1337/api/accounts/signup/", params)
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
    let payload = validateSignUpForm({ username, password, email, phone , pwconfirm });
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
    <div>
      <SignUpForm
        onSubmit={validateForm}
        onUsrChange={handleNameChange}
        onEmailChange={handleEmailChange}
        onPhoneChange={handlePhoneChange}
        onPwChange={pwHandleChange}
        score={score}
        pwMask={pwMask}
        pwconfirm={pwconfirm}
        username={username}
        password={password}
        email={email}
        phone={phone}
        passBtn={passBtn}
        firstName={firstName}
        lastName={lastName}
        onLNchange = {handleLastNameChange}
        onFNchange = {handleFirstNameChange}
      />
    </div>
  );
}

export default SignUpContainer;
