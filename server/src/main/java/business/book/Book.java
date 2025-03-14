package business.book;

/**
 * A record is a special type in Java that automatically generates getters,
 * automatic constructor, equals(), hashCode(), and toString() methods.
 *
 * @param bookId
 * @param title
 * @param author
 * @param description
 * @param price
 * @param rating
 * @param isPublic
 * @param isFeatured
 * @param categoryId
 */
public record Book(long bookId, String title, String author,
                   String description, int price, double rating, boolean isPublic, boolean isFeatured,
                   long categoryId) {
}
