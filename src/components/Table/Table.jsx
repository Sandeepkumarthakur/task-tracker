import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const renderRow = (row, formData, handleFunction, handleDelete) => (
  <TableRow
    key={row.name}
    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  >
    <TableCell component="th" scope="row">
      {row.name}
    </TableCell>
    <TableCell align="center">{row.date}</TableCell>
    <TableCell align="center">
      {row.status === "completed" ? (
        <span>Completed</span>
      ) : (
        <div>
          <span>Task is Incomplete</span>
          <br />
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={(e) => handleFunction(e, row.name)}
          >
            <option value="">Select status</option>
            <option value="completed">Completed</option>
            <option value="inComplete">In Complete</option>
          </select>
        </div>
      )}
    </TableCell>
    <TableCell align="right">
      <button
        type="button"
        className="custom-btn-danger"
        onClick={() => handleDelete(row.name)}
      >
        Delete
      </button>
    </TableCell>
  </TableRow>
);

const Tables = ({ formData, task, setTask, filterValue }) => {
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);

      if (filterValue === "completed" || filterValue === "inComplete") {
        const updatedTasks = parsedTasks.filter(
          (row) => row.status === filterValue
        );
        setTask(updatedTasks);
      } else {
        setTask(parsedTasks);
      }
    }
  }, [setTask, filterValue]);

  if (task.length === 0) {
    return <p>No tasks available</p>;
  }

  const handleDelete = (name) => {
    const updatedTasks = task.filter((row) => row.name !== name);
    setTask(updatedTasks);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    if (updatedTasks.length === 0) {
      localStorage.removeItem("tasks");
    }
  };

  const handleFunction = (e, name) => {
    const { value } = e.target;
    const updatedTasks = task.map((row) =>
      row.name === name ? { ...row, status: value } : row
    );

    setTask(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {task.map((row) =>
            renderRow(row, formData, handleFunction, handleDelete)
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tables;
