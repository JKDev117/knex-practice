-- 17.18 Relationships and schema design
-- to run file: 
-- \i /Users/jaekim/projects/node/knex-practice/sql-scripts/seed_projects.sql

-- TRUNCATE all tables to ensure that there are no
-- data in them so we start with a fresh set of data
TRUNCATE department, employee, employee_project, project RESTART IDENTITY CASCADE;

-- insert 4 projects
INSERT INTO project
  (project_name, budget, start_date)
  VALUES
    ('Build Database', 20000, '3/4/2019'),
    ('Plan christmas party', 500, '11/20/2019'),
    ('Remove old stock', 1000, '4/6/2019'),
    ('Watch paint dry', 3000, '2/11/2019');

-- insert 4 departments
INSERT INTO department
  (dept_name)
  VALUES
    ('Development'),
    ('Sales'),
    ('Human Resources'),
    ('Warehouse');

-- insert some employees
INSERT INTO employee
  (emp_name, phone, title, salary, department)
  VALUES
    ('Michael Scott', '5551234', 'Regional Manager', 80000, 2),
    ('Dwight Schrute', '5554321', 'Assistant to Regional Manager', 30000, 2),
    ('Jim Halpert', '5555678', 'Salesman', 50000, 2),
    ('Pam Beasley', '5558765', 'Secretary', 35000, 2) ,
    ('Meredith Palmer', '5559876', 'Supplier Relations', 30000, 4),
    ('Toby Flenderson', '5558769', 'Head Human Resources', 60000, 3),
    ('Edgar Djikstra', '5554567', 'Lead Software Developer', 120000, 1);

-- Add managers to the departments
UPDATE department SET manager = 7 WHERE id = 1;
UPDATE department SET manager = 3 WHERE id = 2;
UPDATE department SET manager = 6 WHERE id = 3;
UPDATE department SET manager = 5 WHERE id = 4;

-- put employees on projects
INSERT INTO employee_project
  (emp_id, project_id, start_date, end_date)
  VALUES
    (7, 1, '3/4/2019', '6/1/2019'),
    (6, 2, '11/20/2019', '12/25/2019'),
    (5, 3, '4/6/2019', '4/12/2019'),
    (4, 4, '2/11/2019', '2/15/2019'),
    (3, 4, '2/25/2019', '3/15/2019'),
    (2, 4, '2/11/2019', '2/25/2019'),
    (1, 4, '2/15/2019', '4/12/2019');



-- TEST CODE BELOW -- 

-- ASSIGNMENT 17.18 ----------------------------------------------------------------------------------------------------------------------------------------

-- 1. How many people work in the Sales department?
SELECT DISTINCT dept_name, COUNT(e.emp_name) as num_Of_Employees
FROM
    employee e
    INNER JOIN
    department d
    ON e.department = d.id
WHERE
    d.dept_name = 'Sales'
GROUP BY d.dept_name;


-- 2. List the names of all employees assigned to the 'Plan Christmas party' project.
SELECT
    p.project_name as project,
    e.emp_name as employees_assigned
FROM
    employee e
    JOIN
    employee_project ep
    ON e.id = ep.emp_id
    JOIN
    project p
    ON ep.project_id = p.id
WHERE
    p.project_name = 'Plan christmas party';


-- 3. List the names of employees from the Warehouse department that are assigned to the 'Watch paint dry' project.
SELECT dept_name, project_name as list_of_all_projects, emp_name as employee_assigned
FROM
    department d
    JOIN
    employee e
    ON e.department = d.id
    JOIN
    employee_project ep
    ON e.id = ep.emp_id
    JOIN
    project p
    ON ep.project_id = p.id
WHERE dept_name='Warehouse';

-- 4. Which projects are the Sales department employees assigned to?
SELECT dept_name, emp_name, project_name
FROM
    department d
    JOIN
    employee e
    ON e.department = d.id
    JOIN
    employee_project ep
    ON e.id = ep.emp_id
    JOIN
    project p
    ON ep.project_id = p.id
WHERE dept_name='Sales';

-- 5. List only the managers that are assigned to the 'Watch paint dry' project.

SELECT project_name, emp_name as manager, dept_name
FROM
    department d
    JOIN
    employee e
    ON e.id = d.manager
    JOIN
    employee_project ep
    ON e.id = ep.emp_id
    JOIN
    project p
    ON ep.project_id = p.id
WHERE project_name='Watch paint dry';






