package business;

import business.book.BookDao;
import business.book.BookDaoJdbc;
import business.category.CategoryDao;
import business.category.CategoryDaoJdbc;
import business.customer.CustomerDao;
import business.customer.CustomerDaoJdbc;
import business.order.*;

//Singleton-based Dependency Injection (DI) container
//It is a central class that creates and manages objects (DAOs and services)
public class ApplicationContext {

    private CategoryDao categoryDao;
    private BookDao bookDao;
    private OrderService orderService;

    private OrderDao orderDao;
    private LineItemDao lineItemDao;
    private CustomerDao customerDao;
    //This creates a single global instance (INSTANCE) of ApplicationContext
    public static ApplicationContext INSTANCE = new ApplicationContext();

    //Constructor that sets up all DAOs and services
    private ApplicationContext() {

        categoryDao = new CategoryDaoJdbc();
        bookDao = new BookDaoJdbc();
        orderDao = new OrderDaoJdbc(); // Instantiate OrderDao
        lineItemDao = new LineItemDaoJdbc(); // Instantiate LineItemDao
        customerDao = new CustomerDaoJdbc(); // Instantiate CustomerDao

        //This is manual dependency injection
        //Create and Wire Service
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
