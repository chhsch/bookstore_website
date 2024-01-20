import '../assets/css/Confirmation.css'
import "../types";
import '../assets/css/ConfirmationTable.css'
import React, { useContext } from "react";
import ConfirmationTable from "./ConfirmationTable";
import { OrderDetailsContext } from '../contexts/OrderDetailsContext';
function ConfirmationPage()
{
    const { state: { orderDetails } }  = useContext(OrderDetailsContext);

    console.log(orderDetails);
    if (!orderDetails) {
        return <div>Loading order details...</div>;
    }
    const ccExpDate = new Date(orderDetails.customer.ccExpiryYear, orderDetails.customer.ccExpiryMonth - 1);

    const orderDate =  () => {
        let date = new Date(orderDetails.order.dateCreated);
        console.log(date);
        console.log(orderDetails);
        return ( date.toLocaleString());
    };


    return(

        <div className="confirmationback">
            <div className="confirmationView">
            <div className="date">
                <li>Confirmation #: 123456789</li>
                <li>{orderDate()}</li>
            </div>
            <ConfirmationTable />
                <div className="Info">
                    <li><b>Name:</b> {orderDetails?.customer?.customerName}</li>
                    <li><b>Address:</b> {orderDetails?.customer?.address}</li>
                    <li><b>Email:</b> {orderDetails?.customer?.email}</li>
                    <li><b>Phone:</b> {orderDetails?.customer?.phone}</li>
                    <li>
                        <b>Credit Card:</b> **** **** **** {orderDetails?.customer?.ccNumber?.slice(-4)}
                        ({orderDetails?.customer?.ccExpiryMonth ? orderDetails.customer.ccExpiryMonth.toString().padStart(2, '0') : ''}-
                        {orderDetails?.customer?.ccExpiryYear ?? ''})
                    </li>
                </div>

                <div id="customerInfo"></div>
            </div>
        </div>
    )
}

export default ConfirmationPage;