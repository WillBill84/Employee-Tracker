INSERT INTO department (name)
VALUES ("Admin"), ("Development"), ("Marketing");


INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 100000, 1), ("Engineer", 100000, 2), ("Intern", 40000, 2);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1, 1), ("Bill", "Blogs", 2, 1), ("Steve", "Stevenson", 3, 1);

