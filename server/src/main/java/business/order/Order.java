package business.order;

import java.util.Date;

/**
 * Represents a customer stored in the database.
 *
 * @param orderId
 * @param amount
 * @param dateCreated
 * @param confirmationNumber
 * @param customerId
 */
public record Order(long orderId, int amount, Date dateCreated, long confirmationNumber, long customerId) {
}
