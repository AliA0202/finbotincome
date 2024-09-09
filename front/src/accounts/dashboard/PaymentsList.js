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
            <h3 className="flex align-center color-dark-blue margin-top-5 margin-bottom-5"><span className="material-symbols-outlined">bookmark</span>&nbsp;پست های ذخیره شده</h3>
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
                        <div className="flex flex-row saved-post-card success-card">
                                    <div className="flex space-between margin-right-15 width-full align-center">
                                        <div>
                                            <h4 className="color-dark-blue margin-less">{`${payment.amount} ریال`}</h4>
                                            <h6 className="color-dark-blue margin-less">{`کد: ${payment.authority}`}</h6>
                                            <h6 className="color-dark-blue margin-less">{statusOf[payment.status]}</h6>
                                            <h6 className="margin-less color-light-gray">{payment.created_at}</h6>
                                        </div>
                                        <a href="#" className="color-dark-blue"><span class="material-symbols-outlined">check_circle</span></a>
                                    </div>
                        </div> 
                    ))}
                </InfiniteScroll>
                                     
            </div>
        </div>
    );
}
export default PaymentsList