import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import SinglePayment from "./SinglePayment";
import "./style.css";


function PaymentList(){
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async (page = 1) => {
        try {
            const response = await axios.get(`http://127.0.0.1/api/payment/InvoiceList/?page=${page}`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            setInvoices(response.data.results);
            setTotalCount(response.data.count);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    const handlePageClick = (event) => {
        fetchInvoices(event.selected + 1);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>پرداخت ها</h1>
            {invoices.map(invoice => (
                <div>
                <SinglePayment invoice={invoice} key={invoice.id} />
                <br />
                </div>
            ))}
            <ReactPaginate
                nextLabel="صفحه‌بعد >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={Math.ceil(totalCount / 10)} // Adjust based on your PAGE_SIZE
                previousLabel="< صفحه‌قبل"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
        </div>
    )
}

export default PaymentList;