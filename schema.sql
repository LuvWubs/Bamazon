DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
	id INT(4) NOT NULL,
	product_name VARCHAR(40) NOT NULL,
	dept_name VARCHAR(20) NULL,
	price INT(9) NOT NULL,
	quantity INT(9) NOT NULL
);
INSERT INTO	products (id, product_name, dept_name, price, quantity)
VALUES (1, 'thing1', 'seuss', 20, 1)

INSERT INTO	products (id, product_name, dept_name, price, quantity)
VALUES (2, 'thing2', 'seuss', 30, 1)

INSERT INTO	products (id, product_name, dept_name, price, quantity)
VALUES (3, 'air', 'necessity', 1000, 9999)
