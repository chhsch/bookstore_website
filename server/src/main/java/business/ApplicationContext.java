package business;

import business.book.BookDao;
import business.book.BookDaoJdbc;
import business.category.CategoryDao;
import business.category.CategoryDaoJdbc;
import business.customer.CustomerDao;
import business.customer.CustomerDaoJdbc;
import business.order.*;

public class ApplicationContext {

    // TODO Add field and complete the getter for bookDao

    private CategoryDao categoryDao;
    private BookDao bookDao;
    private OrderService orderService;

    private OrderDao orderDao;
    private LineItemDao lineItemDao;
    private CustomerDao customerDao;
    //This creates a single global instance (INSTANCE) of ApplicationContext
    public static ApplicationContext INSTANCE = new ApplicationContext();

    private ApplicationContext() {

        categoryDao = new CategoryDaoJdbc();
        bookDao = new BookDaoJdbc();
        orderDao = new OrderDaoJdbc(); // Instantiate OrderDao
        lineItemDao = new LineItemDaoJdbc(); // Instantiate LineItemDao
        customerDao = new CustomerDaoJdbc(); // Instantiate CustomerDao

        orderService = new DefaultOrderService();
        ((DefaultOrderService) orderService).setBookDao(bookDao);
        ((DefaultOrderService) orderService).setOrderDao(orderDao); // Wire in OrderDao
        ((DefaultOrderService) orderService).setLineItemDao(lineItemDao); // Wire in LineItemDao
        ((DefaultOrderService) orderService).setCustomerDao(customerDao); // Wire in CustomerDao
    }


    public CategoryDao getCategoryDao() {
        return categoryDao;
    }

    public BookDao getBookDao() {
        return bookDao;
    }

    public OrderService getOrderService() {
        return orderService;
    }
}
