// src/components/PatientForm.js
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function PatientForm({ onSave, patient }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    address: "",
  });

  useEffect(() => {
    if (patient) {
      setFormData(patient);
    } else {
      setFormData({
        name: "",
        age: "",
        gender: "",
        address: "",
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const patientData = {
      ...formData,
      id: patient ? formData.id : uuidv4(), // a random unique id generator fucntion (version 4 Universally Unique Identifier)
    };
    onSave(patientData);
    setFormData({
      name: "",
      age: "",
      gender: "",
      address: "",
    });
  };

  return (
    <div className="mt-4">
      <h4>{patient ? "Edit Patient" : "Add New Patient"}</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <input
            className="form-control"
            type="number"
            placeholder="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <select
            className="form-control"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-2">
          <input
            className="form-control"
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-success" type="submit">
          {patient ? "Save Changes" : "Add Patient"}
        </button>
      </form>
    </div>
  );
}
