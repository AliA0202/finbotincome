import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import EditForm from "./editProfileForm.js";
import { ValidateProfile } from "./validate.js";
import Header from "../Components/Header/Header.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import TicketForm from "./TicketForm.js";
import SavedPostsList from "./dashboard/SavedPostsList.js";
import PaymentsList from "./dashboard/PaymentsList.js";
import ShowTicketDetail from "./showTicketDetail.js";
import toast, { Toaster } from 'react-hot-toast';
import ReferralsUser from "./dashboard/ReferralsUser.js";
import TicketList from "./dashboard/TicketList.js";


const EditProfile = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [redirectTo, setRedirectTo] = useState("");
    const [ticketAnswer, setTicketAnswer] = useState({});
    const [ticketDetail, setTicketDetail] = useState({});
    const [ticketPopUp, setTicketPopUp] = useState(false);
    const [score, setScore] = useState(0);
    const [referral, setReferral] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [tickets, setTickets] = useState([]);


    const sleeped = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };


    const successNotify = (msg) => {
        toast.success(msg);
        setSuccessMsg(null);
    }

    
    const errorNotify = (msg) => {
        toast.error(msg);
        setErrorMsg(null);
    }

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

    


    


    const fetchData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1/api/accounts/edit-profile/", {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            if(response.status === 401) {
                setRedirectTo("logout");
                return; 
            }
            setFirstName(response.data.first_name);
            setLastName(response.data.last_name);
            setPhone(response.data.phone);
            setEmail(response.data.email);
            setUserType(response.data.user_type);
            setUsername(response.data.username);
            setScore(response.data.score);
            setReferral(response.data.referral_code)
            if (response.data.image) {
                setImageUrl(response.data.image);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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

    function handleCaptionChange(event) {
        setCaption(event.target.value)
    }

    function handleTitleChange(event) {
        setTitle(event.target.value)
    }



    function handleImageChange(event) {
        if (event.target.files.length) {
            const file = event.target.files[0];
            const url = URL.createObjectURL(file);
            setImage(file);
            setImageUrl(url);
        }
    };


    const submitProfile = async (event) => {
        event.preventDefault();
        let payload = ValidateProfile({ email, phone });
        if (payload.success) {
            var params = { last_name: lastName, first_name: firstName, image: image };
            await axios
                .patch("http://127.0.0.1/api/accounts/edit-profile/", params, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                })
                .then(async res => {
                    successNotify("پروفایل شما بروزرسانی شد.");
                    //await sleeped(2000);
                    window.location.reload();
                })
                .catch(error => {
                    if (error.response) {
                        errorNotify(error.response.data.non_field_errors);
                    } else if (error.request) {
                        errorNotify(error.request);
                    } else {
                        errorNotify(error.message);
                    }
                });
        }
        else {
            let error = payload.message;
            errorNotify(error);
        }

    }

    function submitTicket(event){
        event.preventDefault();
        var params = { title: title, text: caption};
            axios
                .post("http://127.0.0.1/api/telegram/create-ticket/", params, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                })
                .then(async res => {
                    successNotify("تیکت شما با موفقیت ثبت گردید");
                    //await sleeped(2000);
                    setRedirectTo("dashboard");
                })
                .catch(error => {
                    if (error.response) {
                        errorNotify(error.response.data.non_field_errors);
                    } else if (error.request) {
                        errorNotify(error.request);
                    } else {
                        errorNotify('Error', error.message);
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
            localStorage.removeItem('isAuthenticated');
            setRedirectTo("landing");
        } catch(error){
            errorNotify(error);
        }
    }

    const buyVipAccount = async () => {
        successNotify("در حال پردازش درخواست شما");
        try{
            await axios.get("http://127.0.0.1/api/payment/authority/", {
                headers : {
                    "Authorization" : `Token ${localStorage.getItem('token')}`
                }
            }).then(res => {
                if (res.status === 200){
                    let url = res.data['url'];
                    window.location.href = url;
                }
            });

        } catch(error) {
            errorNotify(error);
        }
    }

    if (loading) {
        return <h4>loading...</h4>
    }

    function createTicketPop(){
        if(ticketPopUp === true){
        return (<ShowTicketDetail 
                title={ticketDetail.title}
                text={ticketDetail.text}
                created={ticketDetail.created}
                ans_text={ticketAnswer.text}
                ans_created={ticketAnswer.created}
                closeClick={closeTicketPopUpClick}
                />)
        }
    }




    return (
        <>
            {createTicketPop()}

            <div className="overlay" id="overlay">
                <Toaster position="top-left" reverseOrder={false} />
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
                    closeClick={closeClick}
                />
            </div>

            <div className="overlay padding-margin-less" id="ticket-overlay">

                <Toaster position="top-left" reverseOrder={false} />

                <TicketForm
                    title={title}
                    caption={caption}
                    captionChange={handleCaptionChange}
                    titleChange={handleTitleChange}
                    onSubmit={submitTicket}
                    ticketCloseClick={ticketCloseClick}
                />
            </div>

            <div id="main">
            <Header></Header>
                <Toaster position="top-left" reverseOrder={false} />

            <div className="flex space-around main-content">
                <div className="content">
                    <div className="flex flex-wrap flex-row space-between">
                        <div className="content-bar flex flex-row user-info-box">
                            <div className="flex flex-row align-center column-mobile-centeralized">
                                
                                
                                { imageUrl === null ? (
                                    <img src={process.env.PUBLIC_URL + "/static/images/icon/user.png"} className="user-profile-img"></img>
                                ) : (
                                    <img src={imageUrl} className="user-profile-img"></img>
                                )}
                                <div className="flex flex-column margin-right-15">
                                    <h2 className="color-dark-blue margin-bottom-5 margin-top-5 mobile-center">{firstName === "" ? (username) : (<span>{firstName} {lastName}</span>)}</h2>
                                    {firstName === "" ? (<p className="color-dark-blue border-right padding-15">برای بهبود عملکرد وبسایت لطفا اطلاعات حساب خود را تکمیل کنید</p>) : null}
                                    <div className="flex flex-row mobile-control flex-start">
                                        <button type="button" className="flex align-center btn color-light-blue" onClick={editProfileButton}><span class="material-symbols-outlined">edit</span>&nbsp;ویرایش پروفایل</button>
                                        <button className="flex align-center btn color-red" onClick={logoutButton}><span class="material-symbols-outlined">logout</span>&nbsp;خروج از حساب</button>
                                    </div>
                                </div>
                            </div>

                            <div className="line-horizontal-gold mobile-show"></div>

                            <div className="flex align-center mobile-center">
                                <div className="flex flex-column mobile-center">
                                    {userType === "N" ? (
                                        <>
                                            <div className="flex flex-row align-center justify-content-center">
                                                <img src={process.env.PUBLIC_URL + "/static/images/icon/basic.png"} className="user-type-img"></img> &nbsp;
                                                <h4 className="color-dark-blue txt-control">عضویت عادی</h4>
                                            </div>

                                            <div className="flex flex-row justify-content-center">
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

                        <SavedPostsList successNotify={successNotify}/>

                        <PaymentsList/>


                        <TicketList 
                        tickets={tickets}
                        setTicketAnswer={setTicketAnswer}
                        setTicketDetail={setTicketDetail}
                        setTicketPopUp={setTicketPopUp}
                        setTickets={setTickets}
                        ticketAnswer={ticketAnswer}
                        ticketDetail={ticketDetail}
                        ticketPopUp={ticketPopUp} />
                    </div>

                    <div className="flex flex-row flex-wrap margin-top-25 space-between">
                        
                        <ReferralsUser />





                        <div className="content-bar flex flex-column space-between bg-green">
                            <h3 className="flex align-center color-white margin-top-5 margin-bottom-5"><span className="material-symbols-outlined">link</span>&nbsp;دعوت از دوستان</h3>
                            <div className="control-height">
                                <h4 className="color-white text-justify">با دعوت از هر دوست خود، 5 امتیاز کسب کنید. با بالا رفتن امتیاز شما هدایای ارزشمندی تقدیم شما خواهد شد</h4>
                                <p className="link-box color-dark-blue">{referral}</p>

                                <div className="height-200 flex flex-row justify-content-center align-center">
                                    <img src={process.env.PUBLIC_URL + "/static/images/icon/trophy.png"} width="70" height="70"></img>
                                    <div className="flex flex-row align-center padding-25">
                                        <h3 className="color-white margin-less">امتیاز شما</h3>&nbsp;&nbsp;<h1 className="color-white margin-less">{score}</h1>
                                    </div>
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


    function closeClick(){
        document.getElementById("overlay").style.display = "none";
        document.getElementById("main").style.display = "block";
    }

    function closeTicketPopUpClick(){
        const pop = document.getElementById("ticket-btn-menu").style.display = "none";
        setTicketPopUp(false);
        document.getElementById("main").style.display = "block";
    }

    function ticketCloseClick(){
        document.getElementById("ticket-overlay").style.display = "none";
        document.getElementById("main").style.display = "block";
    }

}

export default EditProfile