package business.book;

import java.util.List;

/**
 * Defines methods for querying books.
 */

public interface BookDao {

    public Book findByBookId(long bookId);

    public List<Book> findByCategoryId(long categoryId);

    public List<Book> findRandomByCategoryId(long categoryId, int limit);


}
