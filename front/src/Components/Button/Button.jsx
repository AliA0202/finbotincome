import React from "react";
import "./Button.css";

function Button({Type, buttonType, buttonOnClick, buttonText}){
    return(
            <button type={Type} className={`btn ${buttonType === "btn-banner" && "btn-banner" } ${buttonType === "btn-cta" && "btn-cta" } `} onClick={buttonOnClick}>
                {buttonText}
            </button>
    );
}

export default Button;