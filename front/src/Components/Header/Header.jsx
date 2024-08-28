import React from "react";
import './Header.css';

function Header(){
    return (
        <>
            <nav className="flex space-between">
                <div className="flex space-around navbar">
                    <a href="#" className="nav-logo"><img src={process.env.PUBLIC_URL + "/static/images/logo.png"} className="logo-img"></img> <h1 className="logo-text">Finbotincome</h1></a>
                    <a href="#" className="nav-link"><span className="material-symbols-outlined">sticky_note</span>&nbsp;بلاگ</a>
                    <a href="#" className="nav-link"><span className="material-symbols-outlined">info</span>&nbsp;درباره ما</a>
                    <button className="btn-menu" onClick={menuClick}><img src={process.env.PUBLIC_URL + "/static/images/icon/menu.png"} alt="Menu" width="35" height="35"></img></button>
                </div>

                <div className="flex space-around">
                    <a href="http://127.0.0.1/login" className="nav-link"><span className="material-symbols-outlined">account_circle</span>&nbsp;حساب کاربری</a>
                    <a href="#" className="nav-link"><span className="material-symbols-outlined">support_agent</span>&nbsp;پشتیبانی</a>
                </div>

                <div className="popupMenu flex flex-column" id="popupMenu">
                    <div className="flex flex-end padding-left-45">
                        <button className="btn-menu" onClick={closeClick}><img src={process.env.PUBLIC_URL + "/static/images/icon/close.png"} alt="Menu" width="40" height="40"></img></button>
                    </div>
                    <a href="#" className="nav-link-popup"><span className="material-symbols-outlined">sticky_note</span>&nbsp;بلاگ</a>
                    <a href="#" className="nav-link-popup"><span className="material-symbols-outlined">info</span>&nbsp;درباره ما</a>
                    <a href="http://127.0.0.1/login" className="nav-link-popup"><span className="material-symbols-outlined">account_circle</span>&nbsp;حساب کاربری</a>
                    <a href="#" className="nav-link-popup"><span className="material-symbols-outlined">support_agent</span>&nbsp;پشتیبانی</a>
                </div>
            </nav>
        </>
    );

    function menuClick(){
        document.getElementById("popupMenu").style.display = "flex";
    }
    function closeClick(){
        document.getElementById("popupMenu").style.display = "none";
    }
}

export default Header;