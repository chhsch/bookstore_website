
import  "../assets/css/checkout.css"
import '../assets/css/carttable.css';
import { CartTypes } from '../reducers/CartReducer';
import { useNavigate } from 'react-router-dom';
import {BookItem, CustomerForm, months, OrderDetails,  years} from "../types";
import {CartStore} from "../contexts/CartContext";
import {ChangeEvent, FormEvent, useState} from "react";
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import { isMobilePhone, isvalidEmail, isCreditCard } from './utils';
import React, { useContext } from 'react';
import { OrderDetailsContext } from '../contexts/OrderDetailsContext';
import  "../assets/css/checkout.css"
import '../assets/css/carttable.css';

function CheckoutPage()
{

   const getBookImageUrl = (book: BookItem): string => {
      let name = book.title.toLowerCase();
      name = name.replace(/'/g, "");
      name = name.replace(/,/g, "");
      name = name.replace(/:/g, "");
      return `${name}.gif`;

   };

   function yearFrom(index: number) {
      return new Date().getFullYear() + index;
   }
   const { cart, dispatch: cartDispatch } = useContext(CartStore);
   const navigate = useNavigate();
   const { dispatch: orderDispatch } = useContext(OrderDetailsContext);
   // TO DO error states for the rest of the input elements
   const [nameError, setNameError] = useState("");
   const [addressError, setAddressError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [phoneError, setPhoneError] = useState("");
   const [ccNumberError, setCCNumberError] = useState("");
   const [formData, setFormData] = useState({name: "",address:"", phone:"",email: "",ccNumber: "", ccExpiryMonth:0,ccExpiryYear:0});
   const [checkoutStatus, setCheckoutStatus] = useState("");
   const subtotal = cart.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
   const surcharge = subtotal * 0.1; // Assuming surcharge (tax) is 10% of the subtotal
   const total = subtotal + surcharge;
   const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
   const handleContinueShopping = () => {
      navigate('/');
   };
   const handleCompletePurchase = () => {
      navigate('/confirmation');
   };

   function isValidForm() {
      if (nameError || addressError || phoneError || emailError || ccNumberError) {
         return false;
      }
      return true;
   }



   function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
      const { name, value } = event.target;

      switch (name) {
         case 'name':
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
            if (value.length < 4 || value.length > 45) {
               setNameError("Name must be between 4 and 45 characters");
            } else {
               setNameError("");
            }
            break;

         case 'address':
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
            if (value.length < 4 || value.length > 45) {
               setAddressError("Address must be between 4 and 45 characters");
            } else {
               setAddressError("");
            }
            break;

         case 'phone':
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
            if (!isMobilePhone(value)) {
               setPhoneError("Invalid phone number format!");
            } else {
               setPhoneError("");
            }
            break;

         case 'email':
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
            if (!isvalidEmail(value)) {
               setEmailError("Invalid email format!");
            } else {
               setEmailError("");
            }
            break;

         case 'ccNumber':
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
            if (!isCreditCard(value)) {
               setCCNumberError("Invalid credit card number!");
            } else {
               setCCNumberError("");
            }
            break;

         case 'ccExpiryMonth':
            setFormData((prevFormData) => ({ ...prevFormData, [name]: parseInt(value, 10) }));
            break;

         case 'ccExpiryYear':
            setFormData((prevFormData) => ({ ...prevFormData, [name]: parseInt(value, 10) }));
            break;

         default:
            break;
      }
   }

   const placeOrder = async (customerForm: CustomerForm) => {
      axios.defaults.baseURL = '/ChihHsingBookstoreReactTransact/api/';
      const order = { customerForm, cart: { itemArray: cart } };

      const orders = JSON.stringify(order);
      console.log(orders); // Debugging log

      try {
         const response = await axios.post('orders', orders, {
            headers: { "Content-Type": "application/json" }
         });

         cartDispatch({ type: CartTypes.CLEAR });
         orderDispatch({ type: 'UPDATE', payload: response.data });

         console.log("order details: ", response.data);
         return response.data;
      } catch (error) {
         console.error(error);
         return null;
      }
   };

   async function submitOrder(event:FormEvent) {
      event.preventDefault();
      console.log("Submit order");
      const isFormEmpty = !formData.name && !formData.address && !formData.phone && !formData.email && !formData.ccNumber && !formData.ccExpiryMonth && !formData.ccExpiryYear;
      if (isFormEmpty) {
         setCheckoutStatus("Please fill in the information.");
         return;
      }
      const isFormCorrect =  isValidForm();
      console.log(isFormCorrect);
      if (!isFormCorrect) {
         setCheckoutStatus("ERROR");
      } else {
         setCheckoutStatus("PENDING");
         const orders = await placeOrder({
            name: formData.name,
            address: formData.address,
            phone: formData.phone,
            email: formData.email,
            ccNumber: formData.ccNumber,
            ccExpiryMonth: formData.ccExpiryMonth,
            ccExpiryYear: formData.ccExpiryYear,
         })
         if(orders) {
            setCheckoutStatus("OK");
            navigate('/confirmation');}
         else{
            console.log("Error placing order");
         }
      }

   }

   if (cart.length === 0) {
      return (
          <div style={{ padding: '300px' }}>
             <h2>Your cart is empty</h2>
             <p>You need to add an item to your cart before you can checkout.</p>
             <button onClick={handleContinueShopping}>Continue Shopping</button>
          </div>
      );
   }
   return (
       <section className="checkout-cart-table-view">
          <div className="checkout-page-body">

             <form
                 className="checkout-form"
                 onSubmit ={(event)=>submitOrder(event)}

                 method="post"
             >
                <div >
                   <label htmlFor="fname">Name</label>
                   <input
                       type="text"
                       size={20}
                       name="name"
                       id="fname"
                       value={formData.name}
                       onChange={handleInputChange}
                   />
                </div>
                <> {nameError && <div className="error"> {nameError}</div>}</>
                <div >
                   <label htmlFor="phone">Phone</label>
                   <input
                       type="text"
                       size={20}
                       name="phone"
                       id="phone"
                       value={formData.phone}
                       onChange={handleInputChange}
                   />
                </div>
                {phoneError && <div className="error">{phoneError}</div>}

                <div>
                   <label htmlFor="address">Address</label>
                   <input
                       type="text"
                       size={20}
                       name="address"
                       id="address"
                       value={formData.address}
                       onChange={handleInputChange}
                   />
                </div>
                {addressError && <div className="error">{addressError}</div>}


                <div>
                   <label htmlFor="email">Email</label>
                   <input
                       type="text"
                       size={20}
                       name="email"
                       id="email"
                       value={formData.email}
                       onChange={handleInputChange}
                   />
                </div>
                {emailError && <div className="error">{emailError}</div>}


                <div>
                   <label htmlFor="ccNumber">Credit Card Number</label>
                   <input
                       type="text"
                       size={10}
                       name="ccNumber"
                       id="ccNumber"
                       value={formData.ccNumber}
                       onChange={handleInputChange}
                   />
                </div>
                {ccNumberError && <div className="error">{ccNumberError}</div>}
                <div >
                   <label htmlFor="ccExpiryMonth">Exp Date</label>
                   <select style={{color:'black'}} name ="ccExpiryMonth" value ={formData.ccExpiryMonth} onChange={handleInputChange}>
                      { months.map((month, i) => (
                          <option  key={i}  value={i + 1}  >
                             { month }
                          </option>
                      ))}
                   </select>
                   <select name="ccExpiryYear" value={formData.ccExpiryYear} onChange={handleInputChange}>
                      {Array.from({ length: 15 }, (_, i) => yearFrom(i)).map(year => (
                          <option key={year} value={year}>
                             {year}
                          </option>
                      ))}
                   </select>

                </div>
                <form className="checkout-summary">
                   <p>Items ({totalItems}): <span className="checkout-summary-amount">${subtotal.toFixed(2)}</span></p>
                   <p>Surcharge: <span className="checkout-summary-amount">${surcharge.toFixed(2)}</span></p>
                   <p>Total: <span className="checkout-summary-amount">${total.toFixed(2)}</span></p>

                </form>
                <button type="submit" className="checkout-button">Complete Purchase</button>
             </form>
             <div>

                {
                   checkoutStatus !== ''?
                       <>
                          <section className="checkoutStatusBox" >
                             { (checkoutStatus === 'ERROR')?
                                 <div>
                                    Error: Please fix the problems above and try again.
                                 </div>: ( checkoutStatus === 'PENDING'?
                                     <div>
                                        Processing...
                                     </div> : (checkoutStatus === 'OK'?
                                         <div>
                                            Order placed...
                                         </div>:
                                         <div>
                                            Please fill in the information.
                                         </div>))}
                          </section>
                       </>
                       :<></>}
             </div>
          </div>

          <div >
             <ul className="checkout-cart-info">
                {
                   cart?.map((item, i) => {
                      let imageUrl;
                      try {
                         imageUrl = require(`../assets/images/books/${getBookImageUrl(item.book)}`);
                      } catch (error) {
                         imageUrl = require('../assets/images/books/access to health.gif');
                      }
                      return (
                          <div className="checkout-cart-book-item" key={i}>
                             <div className="checkout-cart-book-image">
                                <img src={imageUrl} alt={item.book.title} className="checkout-cart-info-img" width="20%" height="20%" />
                             </div>
                             <div className="checkout-cart-book-info">
                                <div className="checkout-cart-book-title">{ item.book.title }</div>
                                <div className="checkout-cart-book-subtotal">
                                   {`Total: $${(item.book.price * item.quantity).toFixed(2)}`}
                                </div>
                                <div className="checkout-cart-book-quantity">
                                   <button  className="checkout-icon-button inc-button"      onClick={() => {
                                      cartDispatch({ type: CartTypes.ADD, book:item.book, id: item.book.bookId });
                                   }} >
                                      <i className="fas fa-plus-circle"><FontAwesomeIcon icon={faPlusCircle} /></i>
                                   </button>
                                   <button className="checkout-num-button">{ item.quantity }</button>
                                   <button className="checkout-icon-button dec-button"
                                           onClick={() => {
                                              cartDispatch({ type: CartTypes.REMOVE, book:item.book, id: item.book.bookId });
                                           }}
                                   >
                                      <i className="fas fa-minus-circle"><FontAwesomeIcon icon={faMinusCircle} /></i>
                                   </button>
                                </div>
                             </div>

                          </div>
                      );
                   })}
             </ul>
          </div>
       </section>
   )}

export default CheckoutPage;