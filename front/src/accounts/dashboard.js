import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"
import EditForm from "./editProfileForm.js";
import { ValidateProfile } from "./validate.js";
import Header from "../Components/Header/Header.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import TicketForm from "./TicketForm.js";
import SavedPostsList from "./dashboard/SavedPostsList.js";
import PaymentsList from "./dashboard/PaymentsList.js";

const EditProfile = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [redirectTo, setRedirectTo] = useState("");


    useEffect(() =>{
        switch (redirectTo) {
            case "logout":
                localStorage.removeItem('token');
                localStorage.removeItem('isAuthenticated');
                navigate('/blog');
                break;
            case "dashboard":
                window.location.reload();
                break;
            default:
                navigate(redirectTo);
                break;
        }
        if (localStorage.getItem('token') === null){
            return navigate('/login');
        }
    }, [redirectTo, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1/api/accounts/edit-profile/", {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                });
                
                setFirstName(response.data.first_name);
                setLastName(response.data.last_name);
                setPhone(response.data.phone);
                setEmail(response.data.email);
                setUserType(response.data.user_type);
                if (response.data.image) {
                    setImageUrl(response.data.image)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    function handleFirstNameChange(event) {
        setFirstName(event.target.value)
    }
    function handleLastNameChange(event) {
        setLastName(event.target.value)
    }
    function handleEmailChange(event) {
        setEmail(event.target.value)
    }
    function handlePhoneChange(event) {
        setPhone(event.target.value)
    }
    function handleImageChange(event) {
        if (event.target.files.length) {
            const file = event.target.files[0];
            const url = URL.createObjectURL(file);
            setImage(file);
            setImageUrl(url);
        }
    };

    function submitProfile(event) {
        event.preventDefault();
        let payload = ValidateProfile({ email, phone });
        if (payload.success) {
            var params = { last_name: lastName, first_name: firstName, image: image };
            axios
                .patch("http://127.0.0.1/api/accounts/edit-profile/", params, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                })
                .then(res => {
                    setRedirectTo("dashboard");
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
        else {
            let error = payload.message;
            window.alert(error);
        }

    }

    function submitTicket(event){
        event.preventDefault();
        var params = { title: title, caption: caption};
            axios
                .patch("http://127.0.0.1/api/accounts/ticket/", params, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                })
                .then(res => {
                    setRedirectTo("dashboard");
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

    const logoutButton = async () => {
        try{
            await axios.post("http://127.0.0.1/api/accounts/logout/", {}, {
                headers : {
                    "Authorization" : `Token ${localStorage.getItem('token')}`
                }
            });
            localStorage.removeItem('token');
            setRedirectTo("logout")
        } catch(error){
            return error;
        }
    }

    const buyVipAccount = async () => {
        try{
            await axios.get("http://127.0.0.1/api/payment/authority/", {
                headers : {
                    "Authorization" : `Token ${localStorage.getItem('token')}`
                }
            }).then(res => {
                console.log(res);
                if (res.status == 200){
                    let url = res.data['url'];
                    setRedirectTo( <Link to={url} />);
                }
            });

        } catch(error) {
            console.log(error);
        }
    }

    if (loading) {
        return <h4>loading...</h4>
    }

    return (
        <>
            <div className="overlay" id="overlay">
                <div className="flex flex-start width-full padding-right-45">
                    <button type="button" className="btn-menu width-full" id="btn-menu" onClick={closeClick}><img src={process.env.PUBLIC_URL + "/static/images/icon/close.png"} alt="Menu" width="40" height="40"></img></button>
                </div>
                <EditForm
                    firstName={firstName}
                    lastName={lastName}
                    image={image}
                    imageUrl={imageUrl}
                    email={email}
                    phone={phone}
                    onEmailchange={handleEmailChange}
                    onPhonechange={handlePhoneChange}
                    onFNchange={handleFirstNameChange}
                    onLNchange={handleLastNameChange}
                    onImageChange={handleImageChange}
                    onSubmit={submitProfile}
                />
            </div>

            <div className="overlay" id="ticket-overlay">
                <div className="flex flex-start width-full padding-right-45">
                    <button type="button" className="btn-menu width-full" id="btn-menu-ticket" onClick={ticketCloseClick}><img src={process.env.PUBLIC_URL + "/static/images/icon/close.png"} alt="Menu" width="40" height="40"></img></button>
                </div>
                <TicketForm
                    title={title}
                    caption={caption}
                    onSubmit={submitTicket}
                />
            </div>

            <div id="main">
            <Header></Header>
            <div className="flex space-around main-content">
                <div className="content">

                    <div className="flex flex-wrap flex-row space-between">
                        <div className="content-bar flex flex-row user-info-box">
                            <div className="flex flex-row align-center space-between-mobile">
                                { imageUrl === null ? (
                                    <img src={process.env.PUBLIC_URL + "/static/images/icon/user.png"} className="user-profile-img"></img>
                                ) : (
                                    <img src={imageUrl} className="user-profile-img"></img>
                                )}
                                <div className="flex flex-column margin-right-15">
                                    <h2 className="color-dark-blue margin-bottom-5 margin-top-5">{firstName} {lastName}</h2>
                                    <div className="flex flex-row mobile-control">
                                        <button type="button" className="flex align-center btn color-light-blue" onClick={editProfileButton}><span class="material-symbols-outlined">edit</span>&nbsp;ویرایش پروفایل</button>
                                        <button className="flex align-center btn color-red" onClick={logoutButton}><span class="material-symbols-outlined">logout</span>&nbsp;خروج از حساب</button>
                                    </div>
                                </div>
                            </div>

                            <div className="line-horizontal-gold mobile-show"></div>

                            <div className="flex align-center mobile-end">
                                <div className="flex flex-column">
                                    {userType === "N" ? (
                                        <>
                                            <div className="flex flex-row align-center padding-right-25">
                                                <img src={process.env.PUBLIC_URL + "/static/images/icon/basic.png"} className="user-type-img"></img> &nbsp;
                                                <h4 className="color-dark-blue txt-control">عضویت عادی</h4>
                                            </div>

                                            <div className="flex flex-row">
                                                <button onClick={buyVipAccount} className="btn btn-buy flex align-center">
                                                    <img src={process.env.PUBLIC_URL + "/static/images/icon/vip.png"} className="user-type-img"></img> &nbsp;
                                                    خرید عضویت ویژه
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex flex-row margin-top-15-mobile">
                                                <div className="btn btn-buy flex align-center cursor-less">
                                                    <img src={process.env.PUBLIC_URL + "/static/images/icon/vip.png"} className="user-type-img"></img> &nbsp;
                                                    عضویت ویژه
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>


                       
                    <div className="flex flex-row flex-wrap margin-top-25 space-between">

                        <SavedPostsList/>

                        <PaymentsList/>


                        <div className="content-bar flex flex-column space-between">
                            <div className="flex space-between">
                                <h3 className="flex align-center color-dark-blue margin-top-5 margin-bottom-5"><span className="material-symbols-outlined">paid</span>&nbsp;تیکت ها</h3>
                                <button type="button" className="btn flex align-center color-dark-blue margin-top-5 margin-bottom-5" onClick={ticketButton}><span class="material-symbols-outlined">edit_square</span></button>
                            </div>
                            <div className="line-horizontal-gold"></div>
                            <div className="control-height">
                                <a href="#" className="flex flex-row saved-post-card info-card">
                                    <div className="flex space-between margin-right-15 width-full align-center">
                                        <div>
                                            <h4 className="color-dark-blue margin-less">تیکت 2643217</h4>
                                            <h6 className="margin-less color-light-gray">1403/02/06</h6>
                                        </div>
                                        <a href="#" className="color-dark-blue"><span class="material-symbols-outlined">mark_email_read</span></a>
                                    </div>
                                </a>
                                <a href="#" className="flex flex-row saved-post-card">
                                    <div className="flex space-between margin-right-15 width-full align-center">
                                        <div>
                                            <h4 className="color-dark-blue margin-less">تیکت 2643217</h4>
                                            <h6 className="margin-less color-light-gray">1403/02/06</h6>
                                        </div>
                                        <a href="#" className="color-dark-blue"><span class="material-symbols-outlined">drafts</span></a>
                                    </div>
                                </a>
                            </div>
                            
                        </div>
                    </div>

                    <div className="flex flex-row flex-wrap margin-top-25 space-between">
                        <div className="content-bar flex flex-column">
                            <div className="flex space-between">
                                <h3 className="flex align-center color-dark-blue margin-top-5 margin-bottom-5"><span className="material-symbols-outlined">groups</span>&nbsp;دوستان</h3>
                            </div>                            
                            <div className="line-horizontal-gold"></div>
                            <div className="control-height">
                                <div className="flex flex-row saved-post-card">
                                    <div className="flex space-between margin-right-15 width-full align-center">
                                        <div>
                                            <div className="flex flex-row align-center">
                                                <img src={process.env.PUBLIC_URL + "/static/images/p1.jpg"} className="img-friend"></img>
                                                <h4 className="color-dark-blue margin-less margin-right-5">علیرضا پارسه</h4>
                                            </div>
                                            <h6 className="margin-less color-light-gray flex align-center margin-top-5"><span class="material-symbols-outlined color-gold">trophy</span>&nbsp;25</h6>
                                        </div>
                                        <a href="#" className="color-dark-blue"><span class="material-symbols-outlined color-red">close</span></a>
                                    </div>
                                </div>
                            </div>
                            
                        </div>





                        <div className="content-bar flex flex-column space-between bg-green">
                            <h3 className="flex align-center color-white margin-top-5 margin-bottom-5"><span className="material-symbols-outlined">link</span>&nbsp;دعوت از دوستان</h3>
                            <div className="control-height">
                                <h4 className="color-white text-justify">با دعوت از هر دوست خود، 5 امتیاز کسب کنید. با بالا رفتن امتیاز شما هدایای ارزشمندی تقدیم شما خواهد شد</h4>
                                <p className="link-box color-dark-blue">https://finbotincome/testlink/?user=123456780</p>

                                <div className="height-200 flex flex-row justify-content-center align-center">
                                    <img src={process.env.PUBLIC_URL + "/static/images/icon/trophy.png"} width="90" height="90"></img>
                                    <h2 className="color-white">امتیاز شما&nbsp;<span>16</span></h2>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                                         
                </div>
            </div>

            <Footer></Footer>
            </div>
        </>
    );

    function editProfileButton(){
        document.getElementById("overlay").style.display = "flex";
        document.getElementById("main").style.display = "none";
        document.getElementById("btn-menu").style.display = "flex";
    }

    function ticketButton(){
        document.getElementById("ticket-overlay").style.display = "flex";
        document.getElementById("main").style.display = "none";
        document.getElementById("btn-menu-ticket").style.display = "flex";
    }

    function closeClick(){
        document.getElementById("overlay").style.display = "none";
        document.getElementById("main").style.display = "block";
    }

    function ticketCloseClick(){
        document.getElementById("ticket-overlay").style.display = "none";
        document.getElementById("main").style.display = "block";
    }

}

export default EditProfile