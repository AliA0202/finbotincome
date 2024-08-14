import React from "react";


function SinglePayment(invoice) {
    return (
            <div className="loginBox">
            <p>{invoice.invoice.created_at}</p>
            <p>{invoice.invoice.status}</p>
            <p>{invoice.invoice.amount}</p>
            </div>
    )
}

export default SinglePayment;