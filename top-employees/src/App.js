import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import loadingGif from './img/loading.gif'

const ProjectForm = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeeBirthday, setEmployeeBirthday] = useState("");
  const [employeeSalary, setEmployeeSalary] = useState("");
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 3000,
    },
  });

  const slideUp = useSpring({
    from: { transform: "translateY(100%)" },
    to: { transform: "translateY(0%)" },
    config: {
      tension: 200,
      friction: 20,
    },
  });

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <animated.img src={loadingGif} style={{ ...fadeIn, ...slideUp }} />
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !projectName ||
      !employeeName ||
      !startDate ||
      !endDate ||
      !employeeBirthday
    ) {
      alert("Please fill out all required fields");
      return;
    }

    if (employeeBirthday && !employeeName) {
      alert("If birthday is provided, employee name is mandatory");
      return;
    }
    if (new Date(employeeBirthday).getFullYear() < 1910) {
      alert("Employee birthday cannot be earlier than 1910");
      return;
    }

    const today = new Date();
    const birthDate = new Date(employeeBirthday);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      alert("Employee must be at least 18 years old");
      return;
    }
    if (
      employeeName.length < 2 ||
      /[@!"|\\=\-+_#$%^/,.`\d]/.test(employeeName)
    ) {
      alert(
        "Employee name must be at least 2 characters long, consist only of letters, and cannot include special characters"
      );
      return;
    }
    if (
      employeePhone.length < 10 ||
      !/^\+\d{9,}$/.test(employeePhone) ||
      !/^\+[\d]+$/.test(employeePhone)
    ) {
      alert(
        "Employee phone must start with '+' and be at least 10 digits long, consisting only of numbers"
      );
      return;
    }
    if (!/@.*\.com$/.test(employeeEmail)) {
      alert("Employee email must include '@' and end with '.com'");
      return;
    }
    if (new Date(startDate).getFullYear() < 2000) {
      alert("Start date cannot be earlier than 2000");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      alert("End date cannot be earlier than start date");
      return;
    }
    if (isNaN(employeeSalary) || employeeSalary < 0) {
      alert("Invalid employee salary");
      return;
    }

    const newProject = {
      projectName: projectName,
      employeeName: employeeName,
      startDate: startDate,
      endDate: endDate,
      description: description,
      employeePhone: employeePhone,
      employeeEmail: employeeEmail,
      employeeBirthday: employeeBirthday,
      employeeSalary: employeeSalary,
    };

    if (selectedProjectIndex !== null) {
      // если выбран проект для редактирования, заменяем его в массиве проектов
      const updatedProjects = [...projects];
      updatedProjects[selectedProjectIndex] = newProject;
      setProjects(updatedProjects);
    } else {
      setProjects([...projects, newProject]);
    }

    // очищаем значения полей после добавления/редактирования проекта
    setProjectName("");
    setEmployeeName("");
    setStartDate("");
    setEndDate("");
    setDescription("");
    setEmployeePhone("");
    setEmployeeEmail("");
    setEmployeeBirthday("");
    setEmployeeSalary("");
    setSelectedProjectIndex(null);
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  const handleEditProject = (index) => {
    const selectedProject = projects[index];
    setProjectName(selectedProject.projectName);
    setEmployeeName(selectedProject.employeeName);
    setStartDate(selectedProject.startDate);
    setEndDate(selectedProject.endDate);
    setDescription(selectedProject.description);
    setEmployeePhone(selectedProject.employeePhone);
    setEmployeeEmail(selectedProject.employeeEmail);
    setEmployeeBirthday(selectedProject.employeeBirthday);
    setEmployeeSalary(selectedProject.employeeSalary);
    setSelectedProjectIndex(index);
  };

  const getTopEmployees = () => {
    const actualDate = new Date();
    const lastMonth = new Date(
      actualDate.getFullYear(),
      actualDate.getMonth() - 1,
      actualDate.getDate()
    );

    const completedProjects = projects.filter((project) => {
      const projectEndDate = new Date(project.endDate);
      return projectEndDate >= lastMonth && projectEndDate <= actualDate;
    });

    const employees = {};

    completedProjects.forEach((project) => {
      const { employeeName } = project;
      if (employeeName in employees) {
        employees[employeeName]++;
      } else {
        employees[employeeName] = 1;
      }
    });

    const sortedEmployees = Object.entries(employees).sort((a, b) => {
      return b[1] - a[1];
    });

    return sortedEmployees.slice(0, 5);
  };

  return (
    <>
      <section>
        <div className="main_container container">
          <div className="form__container">
            <form onSubmit={handleSubmit}>
              <div className="inputs__container">
                <div className="projects-line__container">
                  <div className="input-box">
                    <label htmlFor="projectName" className="title-label">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      id="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="input-text"
                      min="0"
                      max="200"
                      placeholder="Type project name"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="startDate" className="title-label">
                      Start Date *
                    </label>
                    <input
                      type="text"
                      onFocus={(e) => (e.target.type = "date")}
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="input-text"
                      min="0"
                      max="200"
                      placeholder="Type Start date"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="employeePhone" className="title-label">
                      Employee Phone
                    </label>
                    <input
                      type="tel"
                      id="employeePhone"
                      className="input-text"
                      placeholder="+359000000000"
                      value={employeePhone}
                      onChange={(e) => setEmployeePhone(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="employeeBirthday" className="title-label">
                      Employee Birthday *
                    </label>
                    <input
                      type="text"
                      onFocus={(e) => (e.target.type = "date")}
                      id="employeeBirthday"
                      className="input-text"
                      value={employeeBirthday}
                      onChange={(e) => setEmployeeBirthday(e.target.value)}
                      placeholder="Type Birthday"
                      required
                    />
                  </div>
                </div>
                <div className="employee-line__container">
                  <div className="input-box">
                    <label htmlFor="employeeName" className="title-label">
                      Employee Name *
                    </label>
                    <input
                      type="text"
                      id="employeeName"
                      value={employeeName}
                      onChange={(e) => setEmployeeName(e.target.value)}
                      className="input-text"
                      min="0"
                      max="200"
                      placeholder="Type employee name"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="endDate" className="title-label">
                      End Date *
                    </label>
                    <input
                      type="text"
                      onFocus={(e) => (e.target.type = "date")}
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="input-text"
                      min="0"
                      max="200"
                      placeholder="Type End date"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="employeeEmail" className="title-label">
                      Employee Email
                    </label>
                    <input
                      type="email"
                      id="employeeEmail"
                      className="input-text"
                      value={employeeEmail}
                      onChange={(e) => setEmployeeEmail(e.target.value)}
                      placeholder="Type Email"
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="employeeSalary" className="title-label">
                      Employee Salary
                    </label>
                    <input
                      type="number"
                      id="employeeSalary"
                      className="input-text"
                      value={employeeSalary}
                      onChange={(e) => setEmployeeSalary(e.target.value)}
                      placeholder="Type Salary"
                    />
                  </div>
                </div>
              </div>
              <div className="area-button__container">
                <div className="input-box">
                  <label htmlFor="description" className="title-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    name="comment"
                    className="input-text"
                    placeholder="Type description"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" id="submit" className="submit-button">
                  {selectedProjectIndex !== null
                    ? "Update Project"
                    : "Add Project"}
                </button>
              </div>
            </form>
          </div>
          <div className="content__container">
            <div className="projects__container">
              <h2>Projects</h2>
              <table>
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Employee Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Description</th>
                    <th>Employee Phone</th>
                    <th>Employee Email</th>
                    <th>Employee Birthday</th>
                    <th>Employee Salary</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr key={index}>
                      <td>{project.projectName}</td>
                      <td>{project.employeeName}</td>
                      <td>{project.startDate}</td>
                      <td>{project.endDate}</td>
                      <td className="over-symbols">{project.description}</td>
                      <td>{project.employeePhone}</td>
                      <td>{project.employeeEmail}</td>
                      <td>{project.employeeBirthday}</td>
                      <td>{project.employeeSalary}</td>
                      <td>
                        <button
                          className="submit-button"
                          onClick={() => handleEditProject(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="submit-button"
                          onClick={() => handleDeleteProject(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="employees__container">
              <h2>Top Employees</h2>
              <ul>
                {getTopEmployees().map(([employeeName, completedProjects]) => (
                  <li key={employeeName}>
                    {employeeName} - {completedProjects}{" "}
                    {completedProjects === 1
                      ? "completed project"
                      : "completed projects"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectForm;
