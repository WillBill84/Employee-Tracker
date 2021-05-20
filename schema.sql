DROP DATABASE IF EXISTS tracker_DB;

CREATE DATABASE tracker_DB;

USE tracker_DB;

CREATE TABLE departments (
  id INTEGER AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);


CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL (6,1),
  department_id INTEGER (10),
  PRIMARY KEY (id)
);


CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR (30),
  role_id INTEGER (10),
  manager_id INTEGER (10) NULL,
  PRIMARY KEY (id)
);


SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;

