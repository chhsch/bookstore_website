package business.order;

import api.ApiException;
import business.BookstoreDbException;
import business.JdbcUtils;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.cart.ShoppingCartItem;
import business.customer.Customer;
import business.customer.CustomerDao;
import business.customer.CustomerForm;

import java.sql.Connection;
import java.sql.SQLException;
import java.time.DateTimeException;
import java.time.YearMonth;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class DefaultOrderService implements OrderService {

	private BookDao bookDao;
	private OrderDao orderDao;
	private LineItemDao lineItemDao;
	private CustomerDao customerDao;
	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}
	public void setOrderDao(OrderDao orderDao) {
		this.orderDao = orderDao;
	}

	public void setLineItemDao(LineItemDao lineItemDao) {
		this.lineItemDao = lineItemDao;
	}

	public void setCustomerDao(CustomerDao customerDao) {
		this.customerDao = customerDao;
	}


	@Override
	public OrderDetails getOrderDetails(long orderId) {
		Order order = orderDao.findByOrderId(orderId);
		Customer customer = customerDao.findByCustomerId(order.customerId());
		List<LineItem> lineItems = lineItemDao.findByOrderId(orderId);
		List<Book> books = lineItems
				.stream()
				.map(lineItem -> bookDao.findByBookId(lineItem.bookId()))
				.toList();
		return new OrderDetails(order, customer, lineItems, books);
	}

	@Override
    public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

		validateCustomer(customerForm);
		validateCart(cart);

		// NOTE: MORE CODE PROVIDED NEXT PROJECT
		try (Connection connection = JdbcUtils.getConnection()) {
			Date ccExpDate = getCardExpirationDate(
					customerForm.getCcExpiryMonth(),
					customerForm.getCcExpiryYear());
			return performPlaceOrderTransaction(
					customerForm.getName(),
					customerForm.getAddress(),
					customerForm.getPhone(),
					customerForm.getEmail(),
					customerForm.getCcNumber(),
					ccExpDate, cart, connection);
		} catch (SQLException e) {
			throw new BookstoreDbException("Error during close connection for customer order", e);
		}

	}

	private Date getCardExpirationDate(String monthString, String yearString) {
		try {
			int year = Integer.parseInt(yearString);
			int month = Integer.parseInt(monthString);
			Calendar calendar = Calendar.getInstance();
			calendar.set(Calendar.YEAR, year);
			calendar.set(Calendar.MONTH, month - 1); // Calendar month is 0-based
			calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
			return new Date(calendar.getTimeInMillis());
		} catch (NumberFormatException e) {
			throw new ApiException.ValidationFailure("Invalid credit card expiration date");
		}

	}
	private int generateConfirmationNumber() {
		return ThreadLocalRandom.current().nextInt(999999999);
	}
	private long performPlaceOrderTransaction(
			String name, String address, String phone,
			String email, String ccNumber, Date date,
			ShoppingCart cart, Connection connection) {
		try {
			connection.setAutoCommit(false);
			long customerId = customerDao.create(
					connection, name, address, phone, email,
					ccNumber, date);
			long customerOrderId = orderDao.create(
					connection,
					cart.getComputedSubtotal() + cart.getSurcharge(),
					generateConfirmationNumber(), customerId);
			for (ShoppingCartItem item : cart.getItems()) {
				lineItemDao.create(connection, customerOrderId,
						item.getBookId(), item.getQuantity());
			}
			connection.commit();
			return customerOrderId;
		} catch (Exception e) {
			try {
				connection.rollback();
			} catch (SQLException e1) {
				throw new BookstoreDbException("Failed to roll back transaction", e1);
			}
			return 0;
		}
	}

	private void validateCustomer(CustomerForm customerForm) {

    	String name = customerForm.getName();

		if (name == null || name.length() < 4 || name.length() > 45) {
			throw new ApiException.ValidationFailure("name","Invalid name field");
		}
		String address = customerForm.getAddress();
		if (address == null || address.trim().isEmpty() || address.length() < 4 || address.length() > 45) {
			throw new ApiException.ValidationFailure("address", "Address must be between 4 and 45 characters.");
		}
		// TODO: Validation checks for address, phone, email, ccNumber
		String phone = customerForm.getPhone();
		if (phone == null){
			throw new ApiException.ValidationFailure("phone", "Message phone field");

		}
		String phoneDigits = phone.replaceAll("\\D", "");
		if (phoneDigits.length() != 10){
			throw new ApiException.ValidationFailure("Invalid expiry date");
		}

		// Email Validation
		String email = customerForm.getEmail();
		if (email == null || email.trim().isEmpty() || !email.contains("@") || email.endsWith(".")) {
			throw new ApiException.ValidationFailure("email", "Invalid email format.");
		}

		// Credit Card Number Validation
		String ccNumber = customerForm.getCcNumber().replaceAll("[\\s\\-]", "");
		if (ccNumber.length() < 14 || ccNumber.length() > 16) {
			throw new ApiException.ValidationFailure("ccNumber", "Credit card number must be between 14 and 16 digits.");
		}

		// Expiration Date Validation

		if (expiryDateIsInvalid(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear())) {
			throw new ApiException.ValidationFailure("Invalid expiry date");

		}
	}

	private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {

		try {
			int year = Integer.parseInt(ccExpiryYear);
			int month = Integer.parseInt(ccExpiryMonth);
			YearMonth expiry = YearMonth.of(year, month);
			YearMonth current = YearMonth.now();
			return expiry.isBefore(current);
		} catch (DateTimeException | NumberFormatException e) {
			return false;
		}

	}

	private void validateCart(ShoppingCart cart) {

		if (cart.getItems().size() <= 0) {
			throw new ApiException.ValidationFailure("Cart is empty.");
		}

		cart.getItems().forEach(item-> {
			if (item.getQuantity() < 1 || item.getQuantity() > 99) {
				throw new ApiException.ValidationFailure("quantity", "Invalid quantity");
			}
			Book databaseBook = bookDao.findByBookId(item.getBookId());
			if (databaseBook == null) {
				throw new ApiException.ValidationFailure("bookId", "The book with the given ID does not exist.");
			}
			int priceFromDatabase = databaseBook.price();

			// Check if the price matches
			if (item.getBookForm().getPrice() != priceFromDatabase) {
				throw new ApiException.ValidationFailure("price", "Price does not match the database.");
			}
			long categoryFromDatabase = databaseBook.categoryId();
			if (item.getBookForm().getCategoryId() != categoryFromDatabase) {
				throw new ApiException.ValidationFailure("category", "Category does not match the database.");
			}


		});
	}

}
