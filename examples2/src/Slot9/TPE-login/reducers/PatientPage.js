import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import PatientList from "./PatientList";
import PatientForm from "./PatientForm";
import { patientReducer } from "./PatientReducer";

export default function PatientPage() {
  const [patients, dispatch] = useReducer(patientReducer, []);
  const [editingPatient, setEditingPatient] = useState(null);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/patients")
      .then((res) => dispatch({ type: "SET", payload: res.data }));
  }, []);

  const addPatient = (patient) => {
    axios
      .post("http://localhost:5000/patients", patient)
      .then((res) => dispatch({ type: "ADD", payload: res.data }));
  };

  const updatePatient = (patient) => {
    axios
      .put(`http://localhost:5000/patients/${patient.id}`, patient)
      .then((res) => dispatch({ type: "UPDATE", payload: res.data }));
  };

  const deletePatient = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete(`http://localhost:5000/patients/${id}`)
        .then(() => dispatch({ type: "DELETE", payload: id }));
    }
  };

  // Filter and search logic
  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase());
    const matchesGender = genderFilter === "" || p.gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  return (
    <div className="container">
      <h2>Patient Management</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>
      <PatientForm
        onSave={editingPatient ? updatePatient : addPatient}
        patient={editingPatient}
      />
      <PatientList
        patients={filteredPatients}
        onEdit={setEditingPatient}
        onDelete={deletePatient}
      />
    </div>
  );
}
