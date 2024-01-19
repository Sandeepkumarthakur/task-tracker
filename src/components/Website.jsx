import React, { useState } from "react";
import Tables from "./Table/Table";
import "./Website.css";

const Website = () => {
  const [task, setTask] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTask([...task, formData]);

    setFormData({
      name: "",
      date: "",
      status: "",
    });
  };

  const handleFilter = (e) => {
    const { value } = e.target;
    setFilterValue(value);
  };

  const isAddButtonDisabled = !formData.name || !formData.date;

  return (
    <div className="container">
      <form>
        <div>
          <label htmlFor="name">Task Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Add new task..."
          />
        </div>
        <div>
          <label htmlFor="date">Date: </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="button-container">
          <button
            type="submit"
            className="custom-btn-primary m-10"
            onClick={handleSubmit}
            disabled={isAddButtonDisabled}
          >
            Add
          </button>
        </div>
      </form>
      <div className="container-body">
        <div className="filter-section">
          <h3>Filter by Status</h3>
          <form>
            <label>
              <input
                type="radio"
                name="filter"
                value="completed"
                onChange={handleFilter}
              />
              Completed
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="filter"
                value="inComplete"
                onChange={handleFilter}
              />
              In Complete
            </label>
          </form>
        </div>
        <div className="tables-section">
          <Tables
            formData={formData}
            task={task}
            setTask={setTask}
            filterValue={filterValue}
          />
        </div>
      </div>
    </div>
  );
};

export default Website;
