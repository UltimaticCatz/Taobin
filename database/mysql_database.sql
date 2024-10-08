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
    ('banana frappe', 30.00, 'frappe'), 
    ('oreo frappe', 40.00, 'frappe'), 
    ('hot cocoa', 30.00, 'hot'), 
    ('cold cocoa', 35.00, 'cold'), 
    ('cocoa frappe', 40.00, 'frappe');