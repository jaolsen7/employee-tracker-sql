INSERT INTO department (name)
VALUES  ("Marketing"),
        ("Operations"),
        ("HR"),
        ("IT");
-- need values for dept_id,etc
INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Rep", 75000, 1),
        ("Sales Manager", 125000, 1),
        ("Materials Engineer", 80000, 2),
        ("Mechanical Engineer", 90000, 2),
        ("Electrical Engineer", 100000, 2),
        ("Hiring Manager", 60000, 3),
        ("Head of Internal Affairs", 80000, 3),
        ("Tech Support", 75000, 4),
        ("Software Manager", 75000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Johnson", 1, 1),
        ("Bob", "Bobson", 2, 2),
        ("Joe", "Joeson", 3, 1),
        ("Billy", "Billyson", 4, 2),
        ("Jack", "Jackson", 5, 1),
        ("Brock", "Brockson", 6, 2),
        ("Jim", "Jimson", 7, 1),
        ("Brooke", "Brookeson", 8, 2);