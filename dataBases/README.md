# 📊 Complete Database Course Notes

## 1. Introduction to Databases

### What is a Database?
A database is an organized collection of structured information stored electronically in a computer system. Think of it as a digital filing cabinet where data is stored in tables with rows and columns.

**Key Concepts:**
- **Data**: Raw facts and figures
- **Information**: Processed data that provides meaning
- **Database Management System (DBMS)**: Software that manages databases
- **Table**: Collection of related data entries consisting of columns and rows

### SQL vs NoSQL 
#### SQL Databases (Relational)
- **Structure**: Tables with predefined schema
- **Language**: SQL (Structured Query Language)
- **Examples**: MySQL, PostgreSQL, SQLite, Oracle
- **Best for**: Complex queries, transactions, structured data

```sql
-- Example SQL table structure
CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    age INT
);
```

#### NoSQL Databases (Non-Relational)
- **Structure**: Flexible schema (documents, key-value, graphs)
- **Language**: Various query languages
- **Examples**: MongoDB, Redis, Cassandra, Neo4j
- **Best for**: Large scale, flexible data, rapid development

```json
// Example NoSQL document
{
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "preferences": {
        "theme": "dark",
        "notifications": true
    }
}
```

### Developing with Databases 

**Database Development Process:**
1. **Planning**: Define requirements and data relationships
2. **Design**: Create entity-relationship diagrams
3. **Implementation**: Create tables and relationships
4. **Testing**: Verify data integrity and performance
5. **Deployment**: Launch and monitor

**Best Practices:**
- Normalize data to reduce redundancy
- Use proper indexing for performance
- Implement backup strategies
- Follow security protocols

### Managed vs Self-Hosted 

#### Managed Databases
**Pros:**
- Automatic backups and updates
- Built-in security features
- Scalability handling
- 24/7 monitoring

**Cons:**
- Higher cost
- Less control
- Vendor lock-in

**Examples:** AWS RDS, Google Cloud SQL, Azure Database

#### Self-Hosted Databases
**Pros:**
- Full control and customization
- Lower operational cost
- No vendor dependency

**Cons:**
- Manual maintenance required
- Security responsibility
- Need technical expertise

---

# 💻 SQL Project Fundamentals

## Setup and Basics

### Project Setup
We'll use a sample database with the following tables:
- **employees**: Employee information
- **departments**: Department details
- **products**: Product catalog
- **orders**: Customer orders
- **customers**: Customer information

```sql
-- Sample table structure
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    department_id INT,
    salary DECIMAL(10,2),
    hire_date DATE
);
```

## Basic SQL Operations

### SELECT All

The `SELECT` statement retrieves data from database tables.

```sql
-- Select all columns from a table
SELECT * FROM employees;

-- This returns every column and every row
-- * is a wildcard meaning "all columns"
```

**Output Example:**
```
employee_id | first_name | last_name | department_id | salary  | hire_date
1          | John       | Smith     | 1            | 50000   | 2020-01-15
2          | Jane       | Doe       | 2            | 55000   | 2019-03-22
3          | Mike       | Johnson   | 1            | 48000   | 2021-07-10
```

### Selecting Columns 

Choose specific columns instead of all data.

```sql
-- Select specific columns
SELECT first_name, last_name, salary 
FROM employees;

-- Select with alias (renaming columns in output)
SELECT 
    first_name AS "First Name",
    last_name AS "Last Name",
    salary AS "Annual Salary"
FROM employees;

-- Calculated columns
SELECT 
    first_name,
    last_name,
    salary,
    salary * 12 AS annual_salary,
    salary / 12 AS monthly_salary
FROM employees;
```

### WHERE Clause 

Filter rows based on conditions.

```sql
-- Basic WHERE clause
SELECT first_name, last_name, salary
FROM employees
WHERE salary > 50000;

-- Text filtering
SELECT * FROM employees
WHERE first_name = 'John';

-- Date filtering
SELECT * FROM employees
WHERE hire_date >= '2020-01-01';
```

### Numerical Filtering 

Work with numbers and numerical comparisons.

```sql
-- Comparison operators
SELECT * FROM employees WHERE salary = 50000;    -- Equal
SELECT * FROM employees WHERE salary > 50000;    -- Greater than
SELECT * FROM employees WHERE salary < 50000;    -- Less than
SELECT * FROM employees WHERE salary >= 50000;   -- Greater or equal
SELECT * FROM employees WHERE salary <= 50000;   -- Less or equal

-- Mathematical operations
SELECT 
    first_name,
    salary,
    salary * 0.1 AS tax,
    salary * 0.9 AS after_tax
FROM employees
WHERE salary > 40000;
```

### NOT Equal 

Exclude specific values.

```sql
-- Not equal operators
SELECT * FROM employees WHERE department_id != 1;
SELECT * FROM employees WHERE department_id <> 1;  -- Same as !=

-- Multiple exclusions
SELECT * FROM employees 
WHERE first_name != 'John' 
AND last_name != 'Smith';

-- Exclude NULL values
SELECT * FROM employees WHERE salary IS NOT NULL;
```

### NOT and LIKE 

Advanced text filtering and pattern matching.

```sql
-- NOT operator
SELECT * FROM employees WHERE NOT department_id = 1;
SELECT * FROM employees WHERE NOT salary > 50000;

-- LIKE operator for pattern matching
SELECT * FROM employees WHERE first_name LIKE 'J%';      -- Starts with 'J'
SELECT * FROM employees WHERE first_name LIKE '%n';      -- Ends with 'n'
SELECT * FROM employees WHERE first_name LIKE '%oh%';    -- Contains 'oh'
SELECT * FROM employees WHERE first_name LIKE 'J___';    -- 'J' + 3 characters

-- NOT LIKE
SELECT * FROM employees WHERE first_name NOT LIKE 'J%';

-- Case-insensitive matching (depends on database)
SELECT * FROM employees WHERE LOWER(first_name) LIKE 'j%';
```

### AND Operator 
Combine multiple conditions (all must be true).

```sql
-- Basic AND
SELECT * FROM employees 
WHERE salary > 40000 AND department_id = 1;

-- Multiple AND conditions
SELECT * FROM employees 
WHERE salary > 40000 
AND department_id = 1 
AND hire_date >= '2020-01-01';

-- AND with LIKE
SELECT * FROM employees 
WHERE first_name LIKE 'J%' 
AND salary > 45000;
```

### BETWEEN 

Filter data within a range.

```sql
-- Numeric range
SELECT * FROM employees 
WHERE salary BETWEEN 40000 AND 60000;

-- Date range
SELECT * FROM employees 
WHERE hire_date BETWEEN '2020-01-01' AND '2021-12-31';

-- NOT BETWEEN
SELECT * FROM employees 
WHERE salary NOT BETWEEN 40000 AND 60000;

-- BETWEEN with other conditions
SELECT first_name, last_name, salary
FROM employees 
WHERE salary BETWEEN 45000 AND 55000 
AND department_id = 1;
```

### OR Operator 

At least one condition must be true.

```sql
-- Basic OR
SELECT * FROM employees 
WHERE department_id = 1 OR department_id = 2;

-- OR with AND (use parentheses for clarity)
SELECT * FROM employees 
WHERE (department_id = 1 OR department_id = 2) 
AND salary > 45000;

-- Multiple OR conditions
SELECT * FROM employees 
WHERE first_name = 'John' 
OR first_name = 'Jane' 
OR first_name = 'Mike';
```

### IN Operator 

Check if value exists in a list.

```sql
-- IN operator (cleaner than multiple OR)
SELECT * FROM employees 
WHERE department_id IN (1, 2, 3);

-- Text values
SELECT * FROM employees 
WHERE first_name IN ('John', 'Jane', 'Mike');

-- NOT IN
SELECT * FROM employees 
WHERE department_id NOT IN (1, 2);

-- IN with subquery
SELECT * FROM employees 
WHERE department_id IN (
    SELECT department_id 
    FROM departments 
    WHERE department_name LIKE 'Sales%'
);
```

## Data Organization

### ORDER BY 

Sort query results.

```sql
-- Ascending order (default)
SELECT * FROM employees ORDER BY salary;
SELECT * FROM employees ORDER BY salary ASC;

-- Descending order
SELECT * FROM employees ORDER BY salary DESC;

-- Multiple columns
SELECT * FROM employees 
ORDER BY department_id ASC, salary DESC;

-- Order by column position
SELECT first_name, last_name, salary 
FROM employees 
ORDER BY 3 DESC;  -- Order by 3rd column (salary)

-- Order by calculated field
SELECT first_name, last_name, salary * 12 AS annual_salary
FROM employees 
ORDER BY annual_salary DESC;
```

### LIMIT 

Restrict number of returned rows.

```sql
-- Get first 5 records
SELECT * FROM employees LIMIT 5;

-- Top 3 highest paid employees
SELECT first_name, last_name, salary 
FROM employees 
ORDER BY salary DESC 
LIMIT 3;

-- Pagination (OFFSET)
SELECT * FROM employees 
ORDER BY employee_id 
LIMIT 5 OFFSET 10;  -- Skip first 10, get next 5

-- MySQL alternative for pagination
SELECT * FROM employees 
ORDER BY employee_id 
LIMIT 10, 5;  -- Skip 10, get 5
```

## Aggregate Functions

### COUNT and SUM 

Count rows and sum values.

```sql
-- Count all rows
SELECT COUNT(*) FROM employees;

-- Count non-NULL values
SELECT COUNT(salary) FROM employees;

-- Count unique values
SELECT COUNT(DISTINCT department_id) FROM employees;

-- Sum values
SELECT SUM(salary) FROM employees;

-- Sum with condition
SELECT SUM(salary) FROM employees WHERE department_id = 1;

-- Combined aggregates
SELECT 
    COUNT(*) AS total_employees,
    SUM(salary) AS total_payroll,
    COUNT(DISTINCT department_id) AS num_departments
FROM employees;
```

### MAX, MIN, AVG 

Find maximum, minimum, and average values.

```sql
-- Basic aggregates
SELECT 
    MAX(salary) AS highest_salary,
    MIN(salary) AS lowest_salary,
    AVG(salary) AS average_salary
FROM employees;

-- Round average
SELECT ROUND(AVG(salary), 2) AS average_salary FROM employees;

-- Aggregates with conditions
SELECT 
    MAX(salary) AS max_salary,
    MIN(salary) AS min_salary
FROM employees 
WHERE department_id = 1;

-- Date aggregates
SELECT 
    MAX(hire_date) AS most_recent_hire,
    MIN(hire_date) AS oldest_hire
FROM employees;
```

### GROUP BY 

Group rows for aggregate calculations.

```sql
-- Group by single column
SELECT 
    department_id,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary
FROM employees 
GROUP BY department_id;

-- Group by multiple columns
SELECT 
    department_id,
    YEAR(hire_date) AS hire_year,
    COUNT(*) AS employees_hired
FROM employees 
GROUP BY department_id, YEAR(hire_date);

-- Group with ordering
SELECT 
    department_id,
    COUNT(*) AS employee_count
FROM employees 
GROUP BY department_id 
ORDER BY employee_count DESC;
```

### HAVING 

Filter groups (like WHERE but for groups).

```sql
-- HAVING clause
SELECT 
    department_id,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary
FROM employees 
GROUP BY department_id
HAVING COUNT(*) > 2;

-- HAVING with multiple conditions
SELECT 
    department_id,
    AVG(salary) AS avg_salary
FROM employees 
GROUP BY department_id
HAVING AVG(salary) > 50000 
AND COUNT(*) >= 3;

-- WHERE vs HAVING
SELECT 
    department_id,
    COUNT(*) AS employee_count
FROM employees 
WHERE salary > 40000  -- Filter rows before grouping
GROUP BY department_id 
HAVING COUNT(*) > 1;  -- Filter groups after grouping
```

## Data Manipulation

### INSERT INTO 

Add new records to tables.

```sql
-- Insert single record
INSERT INTO employees (first_name, last_name, department_id, salary, hire_date)
VALUES ('Alice', 'Brown', 1, 52000, '2023-01-15');

-- Insert multiple records
INSERT INTO employees (first_name, last_name, department_id, salary, hire_date)
VALUES 
    ('Bob', 'Wilson', 2, 48000, '2023-02-01'),
    ('Carol', 'Davis', 1, 55000, '2023-02-15'),
    ('David', 'Miller', 3, 51000, '2023-03-01');

-- Insert from SELECT
INSERT INTO employees_backup 
SELECT * FROM employees WHERE department_id = 1;

-- Insert with auto-increment
INSERT INTO employees (first_name, last_name, department_id, salary, hire_date)
VALUES ('Eve', 'Taylor', 2, 49000, CURRENT_DATE);
```

### UPDATE 

Modify existing records.

```sql
-- Update single record
UPDATE employees 
SET salary = 55000 
WHERE employee_id = 1;

-- Update multiple columns
UPDATE employees 
SET salary = 60000, department_id = 2 
WHERE employee_id = 1;

-- Update with calculation
UPDATE employees 
SET salary = salary * 1.05 
WHERE department_id = 1;

-- Update with conditions
UPDATE employees 
SET salary = salary + 2000 
WHERE hire_date < '2020-01-01' AND salary < 50000;

-- Update all records (be careful!)
UPDATE employees SET salary = salary * 1.03;
```

### DELETE 

Remove records from tables.

```sql
-- Delete specific record
DELETE FROM employees WHERE employee_id = 10;

-- Delete with conditions
DELETE FROM employees 
WHERE department_id = 3 AND salary < 40000;

-- Delete all records (dangerous!)
DELETE FROM employees;

-- Safe delete with LIMIT
DELETE FROM employees 
WHERE salary < 30000 
LIMIT 1;

-- Delete with subquery
DELETE FROM employees 
WHERE department_id IN (
    SELECT department_id 
    FROM departments 
    WHERE department_name = 'Temp'
);
```

---

# 🔗 Creating and Joining Tables

## Table Management

### Creating Tables 

Design and create database tables.

```sql
-- Basic table creation
CREATE TABLE departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    budget DECIMAL(12,2) DEFAULT 0
);

-- Table with constraints
CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    department_id INT,
    salary DECIMAL(10,2) CHECK (salary > 0),
    hire_date DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- Table with indexes
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATE DEFAULT CURRENT_DATE,
    total_amount DECIMAL(10,2),
    INDEX idx_customer (customer_id),
    INDEX idx_date (order_date)
);
```

### Populating Tables 

Add sample data to tables.

```sql
-- Insert departments
INSERT INTO departments (department_name, location, budget) VALUES
('Sales', 'New York', 500000.00),
('Marketing', 'Chicago', 300000.00),
('IT', 'San Francisco', 800000.00),
('HR', 'Boston', 200000.00);

-- Insert employees
INSERT INTO employees (first_name, last_name, email, department_id, salary, hire_date) VALUES
('John', 'Smith', 'john.smith@company.com', 1, 55000, '2020-01-15'),
('Jane', 'Doe', 'jane.doe@company.com', 2, 52000, '2019-03-22'),
('Mike', 'Johnson', 'mike.johnson@company.com', 3, 75000, '2021-07-10'),
('Sarah', 'Wilson', 'sarah.wilson@company.com', 1, 48000, '2020-11-05');

-- Bulk insert with file
LOAD DATA INFILE 'employees.csv'
INTO TABLE employees
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
```

### ALTER TABLE 

Modify existing table structure.

```sql
-- Add new column
ALTER TABLE employees 
ADD COLUMN phone VARCHAR(15);

-- Add column with default
ALTER TABLE employees 
ADD COLUMN status VARCHAR(20) DEFAULT 'Active';

-- Modify column
ALTER TABLE employees 
MODIFY COLUMN salary DECIMAL(12,2);

-- Rename column
ALTER TABLE employees 
CHANGE COLUMN phone phone_number VARCHAR(15);

-- Drop column
ALTER TABLE employees 
DROP COLUMN phone_number;

-- Add constraint
ALTER TABLE employees 
ADD CONSTRAINT fk_dept 
FOREIGN KEY (department_id) REFERENCES departments(department_id);

-- Drop constraint
ALTER TABLE employees 
DROP FOREIGN KEY fk_dept;

-- Add index
ALTER TABLE employees 
ADD INDEX idx_name (last_name, first_name);
```

## Joins and Relationships

### Basic Joins 

Combine data from multiple tables.

```sql
-- INNER JOIN (most common)
SELECT 
    e.first_name,
    e.last_name,
    e.salary,
    d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;

-- Alternative syntax (older style)
SELECT 
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e, departments d
WHERE e.department_id = d.department_id;
```

### LEFT and RIGHT JOIN 

Include all records from one table.

```sql
-- LEFT JOIN (all employees, even without department)
SELECT 
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id;

-- RIGHT JOIN (all departments, even without employees)
SELECT 
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id;

-- Find employees without departments
SELECT 
    e.first_name,
    e.last_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id
WHERE d.department_id IS NULL;

-- Find departments without employees
SELECT d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id
WHERE e.employee_id IS NULL;
```

### FULL JOIN, INNER JOIN and DROP 

Advanced join operations.

```sql
-- FULL OUTER JOIN (all records from both tables)
SELECT 
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.department_id;

-- MySQL doesn't support FULL JOIN directly, use UNION
SELECT 
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id
UNION
SELECT 
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id;

-- CROSS JOIN (Cartesian product)
SELECT 
    e.first_name,
    d.department_name
FROM employees e
CROSS JOIN departments d;

-- Self JOIN
SELECT 
    e1.first_name AS employee,
    e2.first_name AS colleague
FROM employees e1
JOIN employees e2 ON e1.department_id = e2.department_id
WHERE e1.employee_id != e2.employee_id;
```

### Advanced Aggregates 

Combine joins with aggregate functions.

```sql
-- Department statistics
SELECT 
    d.department_name,
    COUNT(e.employee_id) AS employee_count,
    AVG(e.salary) AS avg_salary,
    MAX(e.salary) AS max_salary,
    MIN(e.salary) AS min_salary
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_id, d.department_name;

-- Monthly hiring report
SELECT 
    YEAR(e.hire_date) AS hire_year,
    MONTH(e.hire_date) AS hire_month,
    d.department_name,
    COUNT(*) AS hires
FROM employees e
JOIN departments d ON e.department_id = d.department_id
GROUP BY YEAR(e.hire_date), MONTH(e.hire_date), d.department_name
ORDER BY hire_year, hire_month;
```

### Joining Multiple Tables 

Work with complex table relationships.

```sql
-- Three table join
SELECT 
    c.customer_name,
    o.order_date,
    p.product_name,
    oi.quantity,
    oi.price
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id;

-- Complex reporting query
SELECT 
    d.department_name,
    e.first_name,
    e.last_name,
    COUNT(o.order_id) AS orders_processed,
    SUM(o.total_amount) AS total_sales
FROM departments d
JOIN employees e ON d.department_id = e.department_id
LEFT JOIN orders o ON e.employee_id = o.processed_by
GROUP BY d.department_id, e.employee_id
HAVING COUNT(o.order_id) > 0
ORDER BY total_sales DESC;

-- Subquery with joins
SELECT 
    e.first_name,
    e.last_name,
    e.salary
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE e.salary > (
    SELECT AVG(salary) 
    FROM employees e2 
    WHERE e2.department_id = e.department_id
);
```

## Security and Best Practices

### SQL Injection Prevention 

Protect against malicious SQL attacks.

```sql
-- VULNERABLE CODE (Don't do this!)
-- query = "SELECT * FROM users WHERE username = '" + userInput + "'";

-- SAFE: Use parameterized queries
-- Prepared statement example (PHP)
/*
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
$stmt->execute([$username, $password]);
*/

-- Input validation
-- Always validate and sanitize user input
-- Use whitelisting for allowed characters
-- Escape special characters

-- Principle of least privilege
-- Grant minimal necessary permissions
GRANT SELECT ON employees TO 'reporting_user'@'localhost';
GRANT INSERT, UPDATE ON orders TO 'sales_app'@'localhost';

-- Use stored procedures
DELIMITER //
CREATE PROCEDURE GetEmployeesByDept(IN dept_id INT)
BEGIN
    SELECT first_name, last_name, salary
    FROM employees 
    WHERE department_id = dept_id;
END //
DELIMITER ;
```

---

#  Quick Reference

## Common SQL Commands
```sql
-- Data Query Language (DQL)
SELECT column1, column2 FROM table_name WHERE condition;

-- Data Manipulation Language (DML)
INSERT INTO table_name (columns) VALUES (values);
UPDATE table_name SET column = value WHERE condition;
DELETE FROM table_name WHERE condition;

-- Data Definition Language (DDL)
CREATE TABLE table_name (column datatype constraints);
ALTER TABLE table_name ADD/DROP/MODIFY column datatype;
DROP TABLE table_name;

-- Data Control Language (DCL)
GRANT permissions ON table TO user;
REVOKE permissions ON table FROM user;
```

## Key Functions
- **Aggregates**: COUNT(), SUM(), AVG(), MAX(), MIN()
- **String**: CONCAT(), SUBSTRING(), UPPER(), LOWER(), TRIM()
- **Date**: NOW(), CURRENT_DATE, YEAR(), MONTH(), DAY()
- **Math**: ROUND(), CEIL(), FLOOR(), ABS()

---

**💡 Pro Tips:**
- Always backup before major changes
- Use EXPLAIN to understand query performance  
- Index frequently queried columns
- Keep queries readable with proper formatting
- Test queries with small datasets first
