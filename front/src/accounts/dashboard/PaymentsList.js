import React, { useEffect, useState } from "react";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';


const PaymentsList = () => {
    const [payments, setPayments] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchPayments(page);
    }, [page]);

    const fetchPayments = async (page) => { //get the posts saved by the user
        const response = await axios.get(`http://127.0.0.1/api/payment/InvoiceList/?page=${page}`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        });
        const data = response.data;
        setPayments((prevPayments) => [...prevPayments, ...data.results]);
        if(data.next === null) {
            setHasMore(false);
        }
    };

    const statusOf = {
        Active: 'فعال',
        Paid: 'پرداخت شده',
        Expired: 'منقضی شد',
        Failed: 'ناموفق'
    };
    return (
        <div className="content-bar flex flex-column space-between">
            <h3 className="flex align-center color-dark-blue margin-top-5 margin-bottom-5"><span className="material-symbols-outlined">paid</span>&nbsp;پرداخت ها</h3>
            <div className="line-horizontal-gold"></div>
            <div className="control-height">
                <InfiniteScroll
                dataLength={payments.length}
                next={() => setPage((prevPage) => prevPage + 1)}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={""}
                >
                    {payments.map((payment)=>(
                        <div className={`flex flex-row saved-post-card ${ payment.status === "Active" && 'info-card'} ${ payment.status === "Paid" && 'success-card' } ${ ((payment.status === "Expired") || (payment.status === "Failed")) && 'danger-card' }`}>
                                    <div className="flex space-between margin-right-15 width-full align-center">
                                        <div>
                                            <h4 className="color-dark-blue margin-less">{`${payment.amount} ریال`}</h4>
                                            <h6 className="color-dark-blue margin-less authority">{`کد: ${payment.authority.substr(payment.authority.length - 10)}`}</h6>
                                            <h6 className="color-dark-blue margin-less">{statusOf[payment.status]}</h6>
                                            <h6 className="margin-less color-light-gray">{payment.created_at}</h6>
                                        </div>
                                        <div className="color-dark-blue">{payment.status === "Paid" ? (
                                            <span class="material-symbols-outlined">order_approve</span>
                                        ) : 
                                            <>
                                                { payment.status === "Active" ? (
                                                    <span class="material-symbols-outlined">order_play</span>
                                                ) : (
                                                    <span class="material-symbols-outlined">contract_delete</span>  
                                                )}
                                            </>
                                        }
                                        </div>
                                    </div>
                        </div> 
                    ))}
                </InfiniteScroll>
                                     
            </div>
        </div>
    );
}
export default PaymentsList