import '../assets/css/ConfirmationTable.css'
import React, { useContext } from 'react';
import { asDollarsAndCents } from "./utils";
import { BookItem, OrderDetails } from '../types'
import { OrderDetailsContext } from '../contexts/OrderDetailsContext';

function ConfirmationTable() {
    const { state } = useContext(OrderDetailsContext);
    const orderDetails = state.orderDetails;
  const bookAt = function (orderDetails: OrderDetails, index: number): BookItem {
  return orderDetails.books[index];
};
  return (
      <table className="confirmation_table">
        {
          orderDetails?.books?.map((book, i) => (
        <tr className="confirmation_tr" key={i}     >
        <td className="confirmation_td">
          {book.title}
        </td>
        <td className = "confirmation_td">{book.bookId}</td>
        <td className = "confirmation_td">{asDollarsAndCents((book.price)*100)}</td>
      </tr>
          ))}
        <tr>
          <td><b>Total :</b></td>
          <td></td>
         <td>{asDollarsAndCents((25.00)*100)}</td>
         </tr>
    </table>
  )}

export default ConfirmationTable;