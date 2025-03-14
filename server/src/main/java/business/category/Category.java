package business.category;

/**
 * @param categoryId
 * @param name       This single line of code automatically generates the following:
 *                   <p>
 *                   public final class Category {
 *                   private final long categoryId;
 *                   private final String name;
 *                   <p>
 *                   // Constructor
 *                   public Category(long categoryId, String name) {
 *                   this.categoryId = categoryId;
 *                   this.name = name;
 *                   }
 *                   <p>
 *                   // Getters
 *                   public long categoryId() { return categoryId; }
 *                   public String name() { return name; }
 *                   <p>
 *                   // equals(), hashCode(), toString() are auto-generated
 *                   }
 */
public record Category(long categoryId, String name) {
}
