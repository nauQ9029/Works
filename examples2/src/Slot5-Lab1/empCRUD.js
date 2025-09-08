import React, { useState, useEffect } from "react";


function EmployeeDashboard() {
  const [employees, setEmployees] = useState([
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
  ]);

  // Create
  useEffect(() => {
    const newEmployee = {
      id: 4,
      name: "New employees",
      department: "New employees departmant",
      salary: 100000,
      hireDate: new Date().toISOString().split("T")[0],
      projects: ["P010", "P011"],
    };
    setEmployees((prev) => [...prev, newEmployee]);
  }, []);

  // Update (id = 2)
  const updatedEmployees = employees.map((emp) =>
    emp.id === 2 ? { ...emp, name: "Updated Employee" } : emp
  );

  // Delete (id = 2)
  const finalEmployees = updatedEmployees.filter((emp) => emp.id !== 2);

  // Highest salary
  const highestSalaryEmp = finalEmployees.reduce((max, emp) =>
    emp.salary > max.salary ? emp : max
  );

  // Engineers with salary > 70000
  const engHighEarners = finalEmployees.filter(
    (emp) => emp.department === "Engineering" && emp.salary > 70000
  );

  // Average salary
  const avgSalary =
    finalEmployees.reduce((sum, emp) => sum + emp.salary, 0) / finalEmployees.length;

  // Employees with >1 project
  const multiProjectEmps = finalEmployees.filter(
    (emp) => emp.projects.length > 1
  );

  return (
    <div className="container">
      <h1>Employee Dashboard</h1>

      <h2>All Employees</h2>
      <table className="emp-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Salary ($)</th>
            <th>Hire Date</th>
            <th>Projects</th>
          </tr>
        </thead>
        <tbody>
          {finalEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.salary}</td>
              <td>{emp.hireDate}</td>
              <td>{emp.projects.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Highest Salary Employee</h2>
      <p>
        {highestSalaryEmp.name} - ${highestSalaryEmp.salary}
      </p>

      <h2>Engineers with Salary &gt; $70,000</h2>
      <ul>
        {engHighEarners.map((emp) => (
          <li key={emp.id}>
            {emp.name} - ${emp.salary}
          </li>
        ))}
      </ul>

      <h2>Average Salary</h2>
      <p>${avgSalary.toFixed(2)}</p>

      <h2>Employees with More Than 1 Project</h2>
      <ul>
        {multiProjectEmps.map((emp) => (
          <li key={emp.id}>
            {emp.name} - Projects: {emp.projects.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeDashboard;
