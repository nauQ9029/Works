import React from "react";
import { companies as initialCompanies } from "../CRUD-3";

const CompanyTable = () => {
  const [companies, setCompanies] = React.useState(initialCompanies);
  const [form, setForm] = React.useState({
    id: "",
    name: "",
    category: "",
    start: "",
    end: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const exists = companies.some((c) => c.id === parseInt(form.id));
    if (exists) {
      setCompanies(
        companies.map((c) =>
          c.id === parseInt(form.id)
            ? {
                ...c,
                ...form,
                id: parseInt(form.id),
                start: parseInt(form.start),
                end: parseInt(form.end),
              }
            : c
        )
      );
    } else {
      setCompanies([
        ...companies,
        {
          ...form,
          id: parseInt(form.id),
          start: parseInt(form.start),
          end: parseInt(form.end),
        },
      ]);
    }
    setForm({ id: "", name: "", category: "", start: "", end: "" });
  };

  const handleEdit = (company) => {
    setForm(company);
  };

  const handleDelete = (id) => {
    setCompanies(companies.filter((c) => c.id !== id));
  };

  console.log(" >>> [DEBUG] Initial companies:", initialCompanies);
  console.log(" >>> [DEBUG] State companies:", companies);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Company CRUD Table</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="category"
              className="form-control"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <input
              type="number"
              name="start"
              className="form-control"
              placeholder="Start Year"
              value={form.start}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <input
              type="number"
              name="end"
              className="form-control"
              placeholder="End Year"
              value={form.end}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <input
              type="number"
              name="id"
              className="form-control"
              placeholder="ID"
              value={form.id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <button className="btn btn-primary w-100" type="submit">
              {form.id ? "Update" : "Add"} Company
            </button>
          </div>
        </div>
      </form>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Start</th>
            <th>End</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.name}</td>
              <td>{company.category}</td>
              <td>{company.start}</td>
              <td>{company.end}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(company)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(company.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {companies.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No companies found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;
