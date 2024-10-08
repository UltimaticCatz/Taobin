-- Select the correct database
USE my_database;

-- Create the table if it doesn't already exist
CREATE TABLE IF NOT EXISTS beverage (
    drink_name VARCHAR(100),
    price DECIMAL(10,2),
    type_drink VARCHAR(100)
);

-- Insert data into the beverage table
INSERT INTO beverage (drink_name, price, type_drink) 
VALUES 
    ('Hot Jasmine Tea', 25.00, 'Hot'), 
    ('Cold Jasmine Tea', 30.00, 'Cold'), 
    ('Hot Jasmine Milk Tea', 30.00, 'Hot'), 
    ('Cold Jasmine Milk Tea', 35.00, 'Cold'), 
    ('Jasmine Milk Tea Frappe', 30.00, 'frappe'), 
    ('Banana Frappe', 30.00, 'frappe'), 
    ('Oreo Frappe', 40.00, 'frappe'), 
    ('Hot Cocoa', 30.00, 'hot'), 
    ('Cold Cocoa', 35.00, 'cold'), 
    ('Cocoa Frappe', 40.00, 'frappe');