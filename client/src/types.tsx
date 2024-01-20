import Classics from './assets/images/categories/classics.jpg';
import Fantasy from './assets/images/categories/fantasy.jpg';
import Mystery from './assets/images/categories/mystery.jpg';
import Romance from './assets/images/categories/romance.jpg';
export interface BookItem {
  bookId: number;
  title: string;
  author: string;
  price: number;
  isPublic: boolean;
  categoryId:number;
}

export interface CategoryItem {
  categoryId: number;
  name: string;
}
export const categoryImages: Record<string, any> = {
  classics: Classics,
  fantasy : Fantasy,
  mystery : Mystery,
  romance : Romance
};

export class ShoppingCartItem {
  id:number;
  book: BookItem;
  quantity: number;

  constructor(theBook: BookItem) {
    this.id = theBook.bookId;
    this.book = theBook;
    this.quantity = 1;

  }

}

export const initialCartState:ShoppingCartItem[] =  [];


export interface ContextProps {
  children: JSX.Element | JSX.Element[]
}


export const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const years = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
export interface CustomerForm {
  name: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpiryMonth: number;
  ccExpiryYear: number;
}

export interface Order {
  orderId: number;
  amount: number;
  dateCreated: number;
  confirmationNumber: number;
  customerId: number;
}

export interface ServerErrorResponse {
  reason: string;
  message: string;
  fieldName: string;
  error: boolean;
}
export interface Order {
  orderId: number;
  amount: number;
  dateCreated: number;
  confirmationNumber: number;
  customerId: number;
}

export interface LineItem {
  bookId: number;
  orderId: number;
  quantity: number;
}
export interface Customer {
  customerName: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpDate: number;
  ccExpiryMonth: number;
  ccExpiryYear: number;
}

export interface OrderDetails {
  order: Order;
  customer: Customer;
  books: BookItem[];
  lineItems?: LineItem[]; // Optional if not always present
}
export interface OrderDetailsState {
  orderDetails: OrderDetails | null;
}

// Define action types for your context
export type OrderDetailsAction = {
  type: string;
  payload: any; // Be more specific with your payload type
};

interface OrderDetailsContextType {
  state: { orderDetails: OrderDetails | null };
  dispatch: React.Dispatch<OrderDetailsAction>;
}