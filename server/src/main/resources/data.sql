DELETE FROM book;
ALTER TABLE book AUTO_INCREMENT = 1001;

DELETE FROM category;
ALTER TABLE category AUTO_INCREMENT = 1001;

INSERT INTO `category` (`name`) VALUES ('Health'),('Children'),('Sports'),('Travel'),('E-books');

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Our Bodies, Ourselves', 'Judy Norsigian', '', 23.12, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Where to Start', 'Gemma Correll', '', 14.13, 0, FALSE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Health Psychology', 'Shelly Taylor', '', 10.36, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Access to Health', 'Rebecca J Donatelle', '', 4.88, 0, FALSE, FALSE, 1001);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('How to Catch a Witch', ' Alice Walstead', '', 7.5, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('8 Little Planets', 'Chris Ferrie', '', 1.99, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Leaf Thief', 'Alice Hemming', '', 12.06, 0, FALSE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('You''re My Little Pumpkin Pie', 'Natalie Marshall', '', 1.42, 0, FALSE, FALSE, 1002);


INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Big Book of Why Sports', 'Wilkie Collins', '', 33.67, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('100 Hikes of a Lifetime: The World''s Ultimate Scenic Trails', 'Kate Siber', '', 17.49, 0, FALSE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Golf is Not a Game of Perfect', 'Dr. Bob Rotella', '', 2.11, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Soccer Smarts for Kids: 60 Skills, Strategies, and Secrets', 'Andrew Latham', '', 1.49, 0, FALSE, FALSE, 1003);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Into the Wild', 'Jon Krakauer', '',16.38, 0, FALSE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('National Geographic Road Atlas 2024', 'National Geographic Maps', '', 17.95, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Fodor''s San Francisco 25 Best', 'Fodor''s Travel Guides', '', 1.49, 0, FALSE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('50 States, 5,000 Ideas', 'National Geographic', '',1.99, 0, TRUE, FALSE, 1004);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('A Midsummer Night''s Dream', 'William Shakespeare', '',6.99, 0, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('No Shelf Required: E-Books in Libraries', 'American Library Association', '', 52.00, 0, FALSE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Winter''s Tale', 'William Shakespeare', '', 0.99, 0, FALSE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Magic City', 'Edith Nesbit', '',8.99, 0, TRUE, FALSE, 1005);