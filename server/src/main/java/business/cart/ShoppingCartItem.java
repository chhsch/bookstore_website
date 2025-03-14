package business.cart;

import business.book.BookForm;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * The ShoppingCartItem class represents a single item in the shopping cart.
 * The quantity of the book being purchased.
 * A reference to BookForm, which holds details about the book.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class ShoppingCartItem {

    private int quantity;

    @JsonProperty("book")
    private BookForm bookForm;

    public ShoppingCartItem() {
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BookForm getBookForm() {
        return bookForm;
    }

    public void setBookForm(BookForm bookForm) {
        this.bookForm = bookForm;
    }

    /**
     * A quick accessor for getting the book id for this item.
     *
     * @return the id of the book in this cart item
     */
    @JsonIgnore
    public long getBookId() {
        return bookForm.getBookId();
    }

}
