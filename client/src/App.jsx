import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faUserShield, faUsers, faEye, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    age: "",
    email: "",
    address: "",
    salary: "",
    department: "",
    ongoingProject: "",
  });
  const [userBtn, setUserBtn] = useState("Add User");
  const [userVariant, setUserVariant] = useState({ bool: true, id: "" });
  const [activeTab, setActiveTab] = useState("employees");

  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);

  const BASE_URL = "http://localhost:3000/api";

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      setUsers(response.data.reverse());
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/dashboard-stats`);
      setTotalEmployees(response.data.totalEmployees);
      setTotalDepartments(response.data.totalDepartments);
      setTotalProjects(response.data.totalProjects);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (activeTab === "dashboard") {
      fetchDashboardData();
    }
  }, [activeTab]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (userVariant.bool) {
      try {
        const emailExists = users.some((user) => user.email === newUser.email);
        if (emailExists) {
          alert("Email already exists. Please use a different email.");
        } else if (Object.values(newUser).every((field) => field.trim() !== "")) {
          const response = await axios.post(`${BASE_URL}/addUser`, newUser);
          setUsers([response.data, ...users]);
          setNewUser({ name: "", age: "", email: "", address: "", salary: "", department: "", ongoingProject: "" });
        } else {
          alert("Please fill in all fields");
        }
      } catch (error) {
        console.error("Error adding user:", error);
      }
      setUserBtn("Add User");
    } else {
      try {
        await axios.put(`${BASE_URL}/users/${userVariant.id}`, newUser);
        fetchUsers();
        setNewUser({ name: "", age: "", email: "", address: "", salary: "", department: "", ongoingProject: "" });
        setUserVariant({ bool: true, id: "" });
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handleUpdateUser = (id) => {
    const findUser = users.find((user) => user._id === id);
    setNewUser(findUser);
    setUserBtn("Update User");
    setUserVariant({ bool: false, id });
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo"><span className="xpert">Xpert</span> <span className="solutions">Solutions</span></div>
        <ul className="nav-links">
          <li onClick={() => setActiveTab("dashboard")}><a href="#"><FontAwesomeIcon icon={faUserShield} /> Dashboard</a></li>
          <li onClick={() => setActiveTab("employees")}><a href="#"><FontAwesomeIcon icon={faUsers} /> Employees</a></li>
          <li onClick={() => setActiveTab("view-employees")}><a href="#"><FontAwesomeIcon icon={faEye} /> View Employee</a></li>
          <li><a href="#"><FontAwesomeIcon icon={faSignInAlt} /> Login</a></li>
        </ul>
      </nav>

      {activeTab === "dashboard" && (
        <div className="container mt-4">
          <h1 className="text-center mb-4">EMPLOYEE MANAGEMENT DASHBOARD</h1>
          <div className="row">
            <div className="col-md-4">
              <div className="card text-center shadow bg-primary text-white">
                <div className="card-body">
                  <h5 className="card-title mt-2">EMPLOYEES</h5>
                  <h2 className="fw-bold">{totalEmployees}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center shadow bg-warning text-dark">
                <div className="card-body">
                  <h5 className="card-title mt-2">DEPARTMENTS</h5>
                  <h2 className="fw-bold">{totalDepartments}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center shadow bg-success text-white">
                <div className="card-body">
                  <h5 className="card-title mt-2">PROJECTS</h5>
                  <h2 className="fw-bold">{totalProjects}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "employees" && (
        <div className="mt-4">
          <h1 className="text-center mb-4">User Management System</h1>
          <form onSubmit={handleAddUser} className="row g-3">
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Name" name="name" value={newUser.name} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <input type="number" className="form-control" placeholder="Age" name="age" value={newUser.age} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <input type="email" className="form-control" placeholder="Email" name="email" value={newUser.email} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Address" name="address" value={newUser.address} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <input type="number" className="form-control" placeholder="Salary" name="salary" value={newUser.salary} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Department" name="department" value={newUser.department} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Ongoing Project" name="ongoingProject" value={newUser.ongoingProject} onChange={handleInputChange} />
            </div>
            <div className="col-12">
              <button className="btn btn-primary">{userBtn}</button>
            </div>
          </form>
        </div>
      )}

      {activeTab === "view-employees" && (
        <div className="mt-4">
          <h3 className="text-center mb-4">Manage Users</h3>
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Sr No</th>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Address</th>
                <th>Salary</th>
                <th>Department</th>
                <th>Ongoing Project</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>${user.salary}</td>
                  <td>{user.department}</td>
                  <td>{user.ongoingProject}</td>
                  <td>
                    <button className="btn btn-warning me-2" onClick={() => handleUpdateUser(user._id)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDeleteUser(user._id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;