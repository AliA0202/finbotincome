import React, {useEffect,useState} from "react";
import './Header.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import { FaBloggerB } from "react-icons/fa";
import { MdOutlineContactSupport, MdSupport } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { IoBusiness } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";



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
                if (response.data.first_name === ""){
                    setProfile(response.data.username);
                }else{
                    setProfile(`${response.data.first_name} ${response.data.last_name}`);
                }
            } catch (error) {
                if (localStorage.getItem('token') != null){
                    localStorage.removeItem('token');
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
                    <Link to="/" className="nav-logo"><img src={process.env.PUBLIC_URL + "/static/images/logo.png"} className="logo-img"></img> <h1 className="logo-text">Finbotincome</h1></Link>
                    <Link to="/blog" className="nav-link"><FaBloggerB className="nav-icon-white"/>&nbsp;بلاگ</Link>
                    <Link to="/aboutus" className="nav-link"><IoBusiness className="nav-icon-white" />&nbsp;درباره ما</Link>
                    <button className="btn-menu" onClick={menuClick}><img src={process.env.PUBLIC_URL + "/static/images/icon/menu.png"} alt="Menu" width="35" height="35"></img></button>
                </div>

                <div className="flex space-around">
                    { (localStorage.getItem('token') === null) ? (
                        <>
                            <Link to="/login" className="nav-link"><RiAccountCircleFill className="nav-icon-white" />&nbsp;
                                <span>حساب کاربری</span> 
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/dashboard" className="nav-link"><RiAccountCircleFill className="nav-icon-white" />&nbsp;
                                <span>
                                {profile}
                                </span>
                            </Link>
                        </>
                    )
                    }
                    <Link to="/support" className="nav-link"><MdSupport className="nav-icon-white" />&nbsp;پشتیبانی</Link>
                </div>

                <div className="popupMenu flex flex-column" id="popupMenu">
                    <div className="flex flex-end padding-left-45">
                        <button className="btn-menu" onClick={closeClick}><img src={process.env.PUBLIC_URL + "/static/images/icon/close.png"} alt="Menu" width="40" height="40"></img></button>
                    </div>
                    <Link to="/blog" className="nav-link-popup"><FaBloggerB className="nav-icon-white"/>&nbsp;بلاگ</Link>
                    <Link to="/aboutus" className="nav-link-popup"><IoBusiness className="nav-icon-white" />&nbsp;درباره ما</Link>
                    { (localStorage.getItem('token') === null) ? (
                        <>
                            <Link to="/login" className="nav-link-popup"><RiAccountCircleFill className="nav-icon-white" />&nbsp;
                                <span>حساب کاربری</span> 
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/dashboard" className="nav-link-popup"><RiAccountCircleFill className="nav-icon-white" />&nbsp;
                                <span>
                                {profile}
                                </span>
                            </Link>
                        </>
                    )
                    }
                    <Link to="/support" className="nav-link-popup"><MdSupport className="nav-icon-white" />&nbsp;پشتیبانی</Link>
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