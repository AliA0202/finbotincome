import React, { useEffect, useState } from "react";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';


const TicketList = ({
    tickets,
    ticketPopUp,
    ticketAnswer,
    ticketDetail,
    setTicketAnswer,
    setTicketDetail,
    setTicketPopUp,
    setTickets
}) => {

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const ticketsList = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1/api/telegram/tickets-list/?page=${page}`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            if(response.status === 200 || response.status === 201) {
                const data = response.data;
                setTickets((prevTickets) => [...prevTickets, ...data.results]);
                if(data.next === null) {
                    setHasMore(false);
                }
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        ticketsList(page);
    }, [page]);



    const getTicketAnswer = async (ticket) => {
        const params = {ticket: ticket.id};

        try {
            const response = await axios.post("http://127.0.0.1/api/telegram/ticket-answers-list/", params,{
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            if(response.status === 200 || response.status === 201) {
                if(response.data.results.length > 0) {
                    setTicketAnswer({text: response.data.results[0].text, created: response.data.results[0].created});
                    setTicketDetail({title : ticket.title, text : ticket.text, created : ticket.created});
                    setTicketPopUp(true);
                }
                else{
                    setTicketAnswer({text: "تیکت شما در حال بررسی است", created: "به زودی به تیکت شما پاسخ داده خواهد شد"});
                    setTicketDetail({title : ticket.title, text : ticket.text, created : ticket.created});
                    setTicketPopUp(true);
                    
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className="content-bar flex flex-column space-between">
            <div className="flex space-between">
                <h3 className="flex align-center color-dark-blue margin-top-5 margin-bottom-5"><span className="material-symbols-outlined">inbox</span>&nbsp;تیکت ها</h3>
                <button type="button" className="ّbtn-icon-space-less flex align-center color-dark-blue margin-top-5 margin-bottom-5" onClick={ticketButton}><span class="material-symbols-outlined">edit_square</span></button>
            </div>
            <div className="line-horizontal-gold"></div>
            <div className="control-height">
                
                { tickets.length > 0 ? <>
                <InfiniteScroll
                dataLength={tickets.length}
                next={() => setPage((prevPage) => prevPage + 1)}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={""}
                >
                    { tickets.map(ticket => (
                        <div className={`flex flex-row saved-post-card ${ ticket.status === "Closed" && ('info-card')} ${ ticket.status === "Open" && ('unread-card')}`}>
                            <div className="flex flex-row space-between width-full align-center">
                                <div>
                                    <h4 className="color-dark-blue margin-less">تیکت&nbsp;{ticket.id}</h4>
                                    <h6 className="color-dark-blue margin-less">{ticket.status === "Open" ? (<span>وضعیت: در حال انتظار</span>) : (<span>وضعیت: پاسخ داده شده</span>)}</h6>
                                    <h6 className="margin-less color-light-gray">{ticket.created}</h6>
                                </div>
                                <div>
                                    <button className="color-dark-blue btn-icon" onClick={() => getTicketAnswer(ticket)}>{ ticket.status === "Closed" ? (<span class="material-symbols-outlined">mark_email_read</span>) : (<span class="material-symbols-outlined">mail</span>)}</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </InfiniteScroll>

                </> : (<p className="flex flex-row align-center padding-15 info-card rounded justify-content-center">
                    <img src={process.env.PUBLIC_URL + "/static/images/icon/sad.png"} width="40"/>هیچ تیکتی تاکنون ثبت نشده است</p>)}
            </div>
        </div>
    );

    function ticketButton(){
        document.getElementById("ticket-overlay").style.display = "flex";
        document.getElementById("main").style.display = "none";
        document.getElementById("btn-menu-ticket").style.display = "flex";
    }

}

export default TicketList;