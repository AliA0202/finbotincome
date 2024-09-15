import React, {useEffect,useState} from "react";
import './Header.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"

function Header(){
    const [profile, setProfile] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1/api/accounts/edit-profile/", {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                });
                setProfile(`${response.data.first_name} ${response.data.last_name}`);
            } catch (error) {
                console.error('Error fetching data:', error);
                console.log("Header Token before remove: ", localStorage.getItem('token'));
                if (localStorage.getItem('token') != null){
                    localStorage.removeItem('token');
                    console.log("Header Token when reomved: ", localStorage.getItem('token'));
                    console.log("Href: ", window.location.href);
                    navigate(window.location.href);
                }
            }
        };

        fetchData();
    }, []);
    

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
                    {console.log('token in header: ', localStorage.getItem('token'))}
                    { (localStorage.getItem('token') === null) ? (
                        <>
                            <a href="http://127.0.0.1/login/" className="nav-link"><span className="material-symbols-outlined">account_circle</span>&nbsp;
                                <span>حساب کاربری</span> 
                            </a>
                        </>
                    ) : (
                        <>
                            <a href="http://127.0.0.1/dashboard/" className="nav-link"><span className="material-symbols-outlined">account_circle</span>&nbsp;
                                <span>
                                {profile}
                                </span>
                            </a>
                        </>
                    )
                    }
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