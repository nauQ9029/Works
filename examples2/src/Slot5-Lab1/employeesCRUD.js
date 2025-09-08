let employees = [
  {
    id: 1,
    name: "Alice Johnson",
    department: "Engineering",
    salary: 75000,
    hireDate: "2023-05-10",
    projects: ["P001", "P002"],
  },
  {
    id: 2,
    name: "Bob Lee",
    department: "Marketing",
    salary: 65000,
    hireDate: "2024-01-20",
    projects: ["P003"],
  },
  {
    id: 3,
    name: "Charlie Kim",
    department: "Engineering",
    salary: 80000,
    hireDate: "2022-11-01",
    projects: ["P001", "P004"],
  },
];

// create
const newEmployees = {
  id: 4,
  name: "New employees",
  department: "New employees departmant",
  salary: 100000,
  hireDate: new Date().toISOString().split("T")[0],
  projects: ["P010", "P011"],
};
employees.push(newEmployees);
console.log("__________ Create new employee __________");
console.log(
  `After create {id: ${newEmployees.id}, name: ${newEmployees.name}, department: ${newEmployees.department}, salary: ${newEmployees.salary}, hireDate: ${newEmployees.hireDate}, projects: ${newEmployees.hireDate}:`,
  employees
);

// read
console.log("__________ Show all employees __________");
employees.forEach((employee) => console.log(employee));

// update employee id = 2
let empToUpdate = 2;
employees = employees.map((employee) => {
  if (employee.id === empToUpdate) {
    return { ...employee, name: "Updated Employee" };
  }
  return employee;
});
console.log(`__________ Update employee with id = ${empToUpdate} __________ \n`, employees);

// delete emp id = 2
let empToRemove = 2;
employees = employees.filter((employee) => employee.id !== empToRemove);
console.log("__________ Removed employee with id = 2 __________ \n", employees);

// Output the one who has the highest salary
const goodSalary = employees.reduce((max, employee) =>
  employee.salary > max.salary ? employee : max
);
console.log("__________ Employee who have the highest salary __________ \n", goodSalary);

// Filter employees in the Engineering department with salary > 70,000
const engSalary7 = employees.filter(
  (employee) => employee.department === "Engineering" && employee.salary > 70000
);
console.log(
  "__________ Employee who deparment is Engineering and salary > 70000 __________ \n",
  engSalary7
);

// Calculate the average salary of all employees
const avgSalary =
  employees.reduce((sum, employee) => sum + employee.salary, 0) / employees.length;
console.log("__________ Average salary __________ \n", avgSalary);

// Find employees working on more than one project 
const empMT1PJ = employees.filter(employee => employee.projects.length > 1);
console.log("__________ Employees who worked more than 1 project __________ \n", empMT1PJ);