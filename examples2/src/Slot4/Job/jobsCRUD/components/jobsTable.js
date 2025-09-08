import React, { useState } from "react";
import { getJobs, setJobs } from "../../jobs";
import "bootstrap/dist/css/bootstrap.min.css";

const JobsTable = () => {
  const [jobs, setLocalJobs] = useState(getJobs());
  const [searchKeyword, setSearchKeyword] = useState("");
  const [newJob, setNewJob] = useState({
    jobId: "",
    title: "",
    company: "",
    location: "",
    salary: { currency: "$", amount: "" },
    employmentType: "",
    postedDate: "",
    applicationDeadline: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const updateGlobalJobs = (updatedJobs) => {
    setJobs(updatedJobs);
    setLocalJobs(updatedJobs);
  };

  const handleInputChange = (e, field, isSalary = false) => {
    const value = e.target.value;
    setNewJob((prev) => ({
      ...prev,
      ...(isSalary
        ? { salary: { ...prev.salary, [field]: value } }
        : { [field]: value }),
    }));
  };

  const handleAddJob = () => {
    const newJobEntry = { ...newJob, salary: { ...newJob.salary } };
    updateGlobalJobs([...jobs, newJobEntry]);
    alert("Job added!");
    setNewJob({
      jobId: "",
      title: "",
      company: "",
      location: "",
      salary: { currency: "$", amount: "" },
      employmentType: "",
      postedDate: "",
      applicationDeadline: "",
    });
  };

  const handleDelete = (jobId) => {
    const updatedJobs = jobs.filter((job) => job.jobId !== jobId);
    updateGlobalJobs(updatedJobs);
    alert("Job deleted successfully!");
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewJob(jobs[index]);
  };

  const handleUpdate = () => {
    const updatedJobs = [...jobs];
    updatedJobs[editIndex] = newJob;
    updateGlobalJobs(updatedJobs);
    alert("Job updated!");
    setEditIndex(null);
    setNewJob({
      jobId: "",
      title: "",
      company: "",
      location: "",
      salary: { currency: "$", amount: "" },
      employmentType: "",
      postedDate: "",
      applicationDeadline: "",
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Jobs Table</h2>

      {/* Form */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">
            {editIndex !== null ? "Edit Job" : "Add New Job"}
          </h5>
          <div className="row g-3">
            {[
              { label: "Job ID", field: "jobId" },
              { label: "Title", field: "title" },
              { label: "Company", field: "company" },
              { label: "Location", field: "location" },
              { label: "Type", field: "employmentType" },
              { label: "Posted Date", field: "postedDate" },
              { label: "Deadline", field: "applicationDeadline" },
            ].map(({ label, field }) => (
              <div className="col-md-3" key={field}>
                <input
                  type="text"
                  className="form-control"
                  placeholder={label}
                  value={newJob[field]}
                  onChange={(e) => handleInputChange(e, field)}
                />
              </div>
            ))}
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="Currency"
                value={newJob.salary.currency}
                onChange={(e) => handleInputChange(e, "currency", true)}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Amount"
                value={newJob.salary.amount}
                onChange={(e) => handleInputChange(e, "amount", true)}
              />
            </div>
            <div className="col-md-2">
              <button
                className={`btn ${
                  editIndex !== null ? "btn-warning" : "btn-primary"
                } w-100`}
                onClick={editIndex !== null ? handleUpdate : handleAddJob}
              >
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search jobs..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Job ID</th>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Type</th>
            <th>Posted Date</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs
            .filter((job) => {
              const keyword = searchKeyword.toLowerCase();
              return Object.values(job)
                .flatMap((val) =>
                  typeof val === "object"
                    ? Object.values(val).map(String)
                    : [String(val)]
                )
                .some((value) => value.toLowerCase().includes(keyword));
            })
            .map((job, index) => (
              <tr key={job.jobId}>
                <td>{job.jobId}</td>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>
                  {job.salary.currency} {job.salary.amount}
                </td>
                <td>{job.employmentType}</td>
                <td>{job.postedDate}</td>
                <td>{job.applicationDeadline}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(job.jobId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          {jobs.length === 0 && (
            <tr>
              <td colSpan="9" className="text-center">
                No jobs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobsTable;
