import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function ViewEmp() {
  const auth = localStorage.getItem("user") ? true : false;

  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadEmployee();
  }, []);
  const loadEmployee = async () => {
    const res = await axios.get(
      `https://101308984-comp-3123-assignment1.vercel.app/api/emp/employees/${id}`
    );
    setEmployee(res.data);
  };

  function onLogout(e) {
    e.preventDefault();
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  }

  if (auth) {
    return (
      <div>
        <div className="d-flex justify-content-between">
          <h2 className="m-0">View Employee</h2>
          <button className="btn btn-info" onClick={(e) => onLogout(e)}>
            Log Out
          </button>
        </div>
        <hr />
        <div className="border p-3 w-50">
          <ul class="list-group mb-4">
            <li class="list-group-item">
              <span className="fw-bold">First Name : </span>
              <span>{employee.first_name}</span>
            </li>
            <li class="list-group-item">
              <span className="fw-bold">Last Name : </span>
              <span>{employee.last_name}</span>
            </li>
            <li class="list-group-item">
              <span className="fw-bold">Email Address : </span>
              <span>{employee.email}</span>
            </li>
            <li class="list-group-item">
              <span className="fw-bold">Gender : </span>
              <span>{employee.gender}</span>
            </li>
            <li class="list-group-item">
              <span className="fw-bold">Salary : </span>
              <span>{employee.salary}</span>
            </li>
          </ul>
          <div className="d-flex">
            <Link
              className="btn btn-primary me-3"
              to={`/editemp/${employee._id}`}
            >
              Edit
            </Link>
            <Link className="btn btn-secondary" to={"/list"}>
              Go Back
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    navigate("/");
  }
}
