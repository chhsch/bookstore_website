package business.customer;

import java.util.Date;

/**
 * @param customerId
 * @param customerName
 * @param address
 * @param phone
 * @param email
 * @param ccNumber
 * @param ccExpDate
 */

public record Customer(long customerId, String customerName, String address, String phone, String email,
                       String ccNumber, Date ccExpDate) {
}
