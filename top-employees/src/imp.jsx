// import React, { useState } from "react";

// const ProjectForm = () => {
//   const [projects, setProjects] = useState([]);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const {
//       projectName,
//       employeeName,
//       startDate,
//       endDate,
//       description,
//       employeePhone,
//       employeeEmail,
//       employeeBirthday,
//       employeeSalary,
//     } = event.target.elements;

//     if (!projectName.value || !employeeName.value || !startDate.value || !endDate.value) {
//       alert("Please fill out all required fields");
//       return;
//     }

//     const newProject = {
//       projectName: projectName.value,
//       employeeName: employeeName.value,
//       startDate: startDate.value,
//       endDate: endDate.value,
//       description: description.value,
//       employeePhone: employeePhone.value,
//       employeeEmail: employeeEmail.value,
//       employeeBirthday: employeeBirthday.value,
//       employeeSalary: employeeSalary.value,
//     };

//     setProjects([...projects, newProject]);

//     // очищаем значения полей после добавления проекта
//     projectName.value = "";
//     employeeName.value = "";
//     startDate.value = "";
//     endDate.value = "";
//     description.value = "";
//     employeePhone.value = "";
//     employeeEmail.value = "";
//     employeeBirthday.value = "";
//     employeeSalary.value = "";
//   };

//   const getTopEmployees = () => {
//     const actualDate = new Date();
//     const lastMonth = new Date(
//       actualDate.getFullYear(),
//       actualDate.getMonth() - 1,
//       actualDate.getDate()
//     );

//     const completedProjects = projects.filter((project) => {
//       const projectEndDate = new Date(project.endDate);
//       return projectEndDate >= lastMonth && projectEndDate <= actualDate;
//     });

//     const employees = {};

//     completedProjects.forEach((project) => {
//       const { employeeName } = project;
//       if (employeeName in employees) {
//         employees[employeeName]++;
//       } else {
//         employees[employeeName] = 1;
//       }
//     });

//     const topEmployees = Object.entries(employees)
//       .sort(([, count1], [, count2]) => count2 - count1)
//       .slice(0, 5)
//       .map(([employeeName]) => employeeName);

//     return topEmployees;
//   };

//   const sortedEmployees = getTopEmployees()
//     .map((employee) => ({
//       employeeName: employee,
//       projectsCount: projects.filter(
//         (project) => project.employeeName === employee
//       ).length,
//     }))
//     .sort((a, b) => b.projectsCount - a.projectsCount);

//   return (
//     <div>
//       <h2>All Projects:</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Project Name</th>
//             <th>Employee Name</th>
//             <th>Start Date</th>
//             <th>End Date</th>
//             <th>Description</th>
//           </tr>
//         </thead>
//         <tbody>
//           {projects.map((project, index) => (
//             <tr key={index}>
//               <td>{project.projectName}</td>
//               <td>{project.employeeName}</td>
//               <td>{project.startDate}</td>
//               <td>{project.endDate}</td>
//               <td>{project.description}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <h2>Top Employees:</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Employee Name</th>
//             <th>Number of Completed Projects</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedEmployees.map((employee, index) => (
//             <tr key={index}>
//               <td>{employee.employeeName}</td>
//               <td>{employee.projectsCount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <h2>Add New Project:</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="projectName">Project Name:</label>
//           <input type="text" id="projectName" required />
//         </div>
//         <div>
//           <label htmlFor="employeeName">Employee Name:</label>
//           <input type="text" id="employeeName" required />
//         </div>
//         <div>
//           <label htmlFor="startDate">Start Date:</label>
//           <input type="date" id="startDate" required />
//         </div>
//         <div>
//           <label htmlFor="endDate">End Date:</label>
//           <input type="date" id="endDate" required />
//         </div>
//         <div>
//           <label htmlFor="description">Description:</label>
//           <textarea id="description" required></textarea>
//         </div>
//         <div>
//           <label htmlFor="employeePhone">Phone:</label>
//           <input type="tel" id="employeePhone" required />
//         </div>
//         <div>
//           <label htmlFor="employeeEmail">Email:</label>
//           <input type="email" id="employeeEmail" required />
//         </div>
//         <div>
//           <label htmlFor="employeeBirthday">Birthday:</label>
//           <input type="date" id="employeeBirthday" required />
//         </div>
//         <div>
//           <label htmlFor="employeeSalary">Salary:</label>
//           <input type="number" id="employeeSalary" required />
//         </div>
//         <button type="submit">Add Project</button>
//       </form>
//     </div>
//   );
// };

// export default ProjectForm;

// import React, { useState } from "react";

// const ProjectForm = () => {
//   const [projects, setProjects] = useState([]);
//   const [projectName, setProjectName] = useState("");
//   const [employeeName, setEmployeeName] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [description, setDescription] = useState("");
//   const [employeePhone, setEmployeePhone] = useState("");
//   const [employeeEmail, setEmployeeEmail] = useState("");
//   const [employeeBirthday, setEmployeeBirthday] = useState("");
//   const [employeeSalary, setEmployeeSalary] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (!projectName || !employeeName || !startDate || !endDate) {
//       alert("Please fill out all required fields");
//       return;
//     }

//     const newProject = {
//       projectName: projectName,
//       employeeName: employeeName,
//       startDate: startDate,
//       endDate: endDate,
//       description: description,
//       employeePhone: employeePhone,
//       employeeEmail: employeeEmail,
//       employeeBirthday: employeeBirthday,
//       employeeSalary: employeeSalary,
//     };

//     setProjects([...projects, newProject]);

//     // очищаем значения полей после добавления проекта
//     setProjectName("");
//     setEmployeeName("");
//     setStartDate("");
//     setEndDate("");
//     setDescription("");
//     setEmployeePhone("");
//     setEmployeeEmail("");
//     setEmployeeBirthday("");
//     setEmployeeSalary("");
//   };

//   const getTopEmployees = () => {
//     const actualDate = new Date();
//     const lastMonth = new Date(
//       actualDate.getFullYear(),
//       actualDate.getMonth() - 1,
//       actualDate.getDate()
//     );

//     const completedProjects = projects.filter((project) => {
//       const projectEndDate = new Date(project.endDate);
//       return projectEndDate >= lastMonth && projectEndDate <= actualDate;
//     });

//     const employees = {};

//     completedProjects.forEach((project) => {
//       const { employeeName } = project;
//       if (employeeName in employees) {
//         employees[employeeName]++;
//       } else {
//         employees[employeeName] = 1;
//       }
//     });

//     const topEmployees = Object.entries(employees)
//       .sort(([, count1], [, count2]) => count2 - count1)
//       .slice(0, 5)
//       .map(([employeeName]) => employeeName);

//     return topEmployees;
//   };

//   const sortedEmployees = getTopEmployees()
//     .map((employee) => ({
//       employeeName: employee,
//       projectsCount: projects.filter(
//         (project) => project.employeeName === employee
//       ).length,
//     }))
//     .sort((a, b) => b.projectsCount - a.projectsCount);

//   return (
//     <div>
//       <h2>All Projects:</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Project Name</th>
//             <th>Employee Name</th>
//             <th>Start Date</th>
//             <th>End Date</th>
//             <th>Description</th>
//           </tr>
//         </thead>
//         <tbody>
//           {projects.map((project, index) => (
//             <tr key={index}>
//               <td>{project.projectName}</td>
//               <td>{project.employeeName}</td>
//               <td>{project.startDate}</td>
//               <td>{project.endDate}</td>
//               <td>{project.description}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h2>Top Employees:</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Employee Name</th>
//             <th>Number of Projects Completed</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedEmployees.map((employee, index) => (
//             <tr key={index}>
//               <td>{employee.employeeName}</td>
//               <td>{employee.projectsCount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h2>Add a New Project:</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="projectName">Project Name:</label>
//           <input
//             type="text"
//             id="projectName"
//             value={projectName}
//             onChange={(event) => setProjectName(event.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="employeeName">Employee Name:</label>
//           <input
//             type="text"
//             id="employeeName"
//             value={employeeName}
//             onChange={(event) => setEmployeeName(event.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="startDate">Start Date:</label>
//           <input
//             type="date"
//             id="startDate"
//             value={startDate}
//             onChange={(event) => setStartDate(event.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="endDate">End Date:</label>
//           <input
//             type="date"
//             id="endDate"
//             value={endDate}
//             onChange={(event) => setEndDate(event.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="description">Description:</label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(event) => setDescription(event.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="employeePhone">Employee Phone:</label>
//           <input
//             type="tel"
//             id="employeePhone"
//             value={employeePhone}
//             onChange={(event) => setEmployeePhone(event.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="employeeEmail">Employee Email:</label>
//           <input
//             type="email"
//             id="employeeEmail"
//             value={employeeEmail}
//             onChange={(event) => setEmployeeEmail(event.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="employeeBirthday">Employee Birthday:</label>
//           <input
//             type="date"
//             id="employeeBirthday"
//             value={employeeBirthday}
//             onChange={(event) => setEmployeeBirthday(event.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="employeeSalary">Employee Salary:</label>
//           <input
//             type="number"
//             id="employeeSalary"
//             value={employeeSalary}
//             onChange={(event) => setEmployeeSalary(event.target.value)}
//           />
//         </div>
//         <button type="submit">Add Project</button>
//       </form>
//     </div>
//   );
// };

// export default ProjectForm;

import React from 'react'

const imp = () => {
  return (
    <div>imp</div>
  )
}

export default imp