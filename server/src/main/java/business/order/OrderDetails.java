package business.order;

import business.book.Book;
import business.customer.Customer;

import java.util.List;

/**
 * A wrapper record that contains:
 * order → Order details (orderID, total amount, date, confirmation number, customerID)
 * customer → Customer who placed the order (customerID, name, address, phone, email, number, expdate)
 * lineItems → List of books purchased (with quantity per book, orderID, bookID)
 * books → List of Book objects(bookID, title, author, description, price, rating, isPublic, isFeatured, catergoryID)
 *
 * @param order
 * @param customer
 * @param lineItems
 * @param books
 */
public record OrderDetails(Order order, Customer customer,
                           List<LineItem> lineItems, List<Book> books) {
}
