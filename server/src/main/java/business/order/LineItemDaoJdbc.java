package business.order;

import business.BookstoreDbException.BookstoreQueryDbException;
import business.BookstoreDbException.BookstoreUpdateDbException;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import static business.JdbcUtils.getConnection;

public class LineItemDaoJdbc implements LineItemDao {

    private static final String CREATE_LINE_ITEM_SQL =
            "INSERT INTO customer_order_line_item (customer_order_id, book_id, quantity) " +
                    "VALUES (?, ?, ?)";

    private static final String FIND_BY_CUSTOMER_ORDER_ID_SQL =
            "SELECT book_id, customer_order_id, quantity " +
                    "FROM customer_order_line_item WHERE customer_order_id = ?";

    @Override
    public void create(Connection connection, long orderId, long bookId, int quantity) {
        // Try-with-resources: Ensures the PreparedStatement is closed automatically after execution
        try (PreparedStatement statement = connection.prepareStatement(CREATE_LINE_ITEM_SQL)) {
            statement.setLong(2, bookId); // 2nd placeholder → Book ID
            statement.setLong(1, orderId); // 1st placeholder → Order ID
            statement.setInt(3, quantity); // 3rd placeholder → Quantity of books
            int affected = statement.executeUpdate();
            if (affected != 1) {
                throw new BookstoreUpdateDbException("Failed to insert an order line item, affected row count = " + affected);
            }
        } catch (SQLException e) {
            throw new BookstoreUpdateDbException("Encountered problem creating a new line item ", e);
        }
    }

    @Override
    public List<LineItem> findByOrderId(long orderId) {
        List<LineItem> result = new ArrayList<>();
        try (Connection connection = getConnection();
             PreparedStatement statement = connection.prepareStatement(FIND_BY_CUSTOMER_ORDER_ID_SQL)) {
            //It binds a long value to a specific placeholder (?) in a SQL query.
            statement.setLong(1, orderId);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    result.add(readLineItem(resultSet));
                }
            }
        } catch (SQLException e) {
            throw new BookstoreQueryDbException("Encountered problem finding ordered books for customer order "
                    + orderId, e);
        }
        return result;
    }

    private LineItem readLineItem(ResultSet resultSet) throws SQLException {
        long bookId = resultSet.getLong("book_id");
        long orderId = resultSet.getLong("customer_order_id");
        int quantity = resultSet.getInt("quantity");
        return new LineItem(bookId, orderId, quantity);
    }
}
