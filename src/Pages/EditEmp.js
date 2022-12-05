import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditEmp () {
  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = localStorage.getItem("user") ? true : false;

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    const result = await axios.get(
      `https://101308984-comp-3123-assignment1.vercel.app/api/emp/employees/${id}`
    );
    setEmployee(result.data);
  };

  const onInputChange = (e) => {
    setEmployee({ ...employee, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const emp = {
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      gender: employee.gender,
      salary: employee.salary,
    };
    await axios.put(
      `https://101308984-comp-3123-assignment1.vercel.app/api/emp/employees/${id}`,
      emp
    );
    alert("Employee updated !");
    navigate("/list");
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
          <h2 className="m-0">Update Employee</h2>
          <button className="btn btn-info" onClick={(e) => onLogout(e)}>
            Log Out
          </button>
        </div>
        <hr />
        <div className="border p-3 w-50">
          <form onSubmit={(e) => onSubmit(e)}>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="first_name"
                placeholder="First Name"
                required={true}
                onChange={(e) => onInputChange(e)}
                value={employee.first_name}
              />
              <label for="first_name">First Name</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="last_name"
                placeholder="Last Name"
                required={true}
                onChange={(e) => onInputChange(e)}
                value={employee.last_name}
              />
              <label for="last_name">Last Name</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Email Address"
                required={true}
                onChange={(e) => onInputChange(e)}
                value={employee.email}
              />
              <label for="email">Email</label>
            </div>
            <div class="form-floating mb-3">
              <select
                class="form-select"
                id="gender"
                aria-label="Floating label select example"
                required={true}
                onChange={(e) => onInputChange(e)}
                value={employee.gender}
              >
                <option selected disabled value="">
                  Select Gender...
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <label for="gender">Gender</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="number"
                class="form-control"
                id="salary"
                placeholder="Salary"
                required={true}
                onChange={(e) => onInputChange(e)}
                value={employee.salary}
              />
              <label for="salary">Salary</label>
            </div>
            <div className="d-flex">
              <button type="submit" className="btn btn-primary me-3">
                Update
              </button>
              <Link className="btn btn-secondary" to={"/list"}>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    navigate("/");
  }
}
