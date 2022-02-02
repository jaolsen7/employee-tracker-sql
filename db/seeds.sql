INSERT INTO department (name)
VALUES  ("John"),
        ("Bob"),
        ("Joe"),
        ("Billy");
-- need values for dept_id,etc
INSERT INTO role (title, salary, department_id)
VALUES  ("Engineer", .9, dept_id),
        ("Janitor", .5, dept_id),
        ("Manager", .8, dept_id),
        ("HR", .6, dept_id),

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Johnson", role_id, man_id),
        ("Bob", "Bobson", role_id, man_id),
        ("Joe", "Joeson", role_id, man_id),
        ("Billy", "Billyson", role_id, man_id),