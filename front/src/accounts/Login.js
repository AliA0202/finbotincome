import React, {useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import LoginForm from "./LoginForm.js";
const FormValidators = require("./validate.js");
const validateLoginForm = FormValidators.validateLoginForm;

const Login = () => {
    const navigate =useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleNameChange(event){
        setUsername(event.target.value);
    };
    function handlePassChange(event){
        setPassword(event.target.value);
    }

    function submitLogin(){
        let params = {username: username, password: password}
        axios
            .post("http://127.0.0.1:1337/accounts/login/", params)
            .then(res => {
                if (res.status === 200){
                    localStorage.token = res.data.token;
                    localStorage.isAuthenticated = true;
                    navigate("/");
                }
                else{
                    window.alert(res.data)
                }
            })
            .catch(error =>{
                if (error.response) {
                    alert(error.response.data.non_field_errors); 
                  } else if (error.request) {
                    console.log(error.request);
                  } else {
                    console.log('Error', error.message);
                  }
            }
            )
    }

    function validateForm(event) {
        
        event.preventDefault();
        let payload = validateLoginForm({username, password});
        if(payload.success){
            submitLogin();
        }
        else{
            let error = payload.message;
            window.alert(error);
        }
    }

    return (
        <div>
            <LoginForm
            onSubmit={validateForm}
            onUNChange={handleNameChange}
            onPWChange={handlePassChange}
            username={username}
            password={password}
            />
        </div>
    )
}   

export default Login;