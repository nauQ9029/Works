import React, { useState, useEffect, useContext } from 'react';
import { PatientContext } from '../context/PatientContext';
import { Form, Button } from 'react-bootstrap';
import { addPatient } from '../services/patientService';

const PatientForm = ({ onSave, editingPatient }) => {
  const { dispatch } = useContext(PatientContext);
  const [patient, setPatient] = useState({ name: '', age: '', gender: '', address: '' });

  useEffect(() => {
    if (editingPatient) {
      setPatient(editingPatient);
    }
  }, [editingPatient]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingPatient) {
      onSave(patient);
    } else {
      const newPatient = await addPatient(patient);
      dispatch({ type: 'ADD_PATIENT', payload: newPatient });
    }
    setPatient({ name: '', age: '', gender: '', address: '' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={patient.name}
          onChange={(e) => setPatient({ ...patient, name: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="text"
          value={patient.age}
          onChange={(e) => setPatient({ ...patient, age: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Gender</Form.Label>
        <Form.Control
          type="text"
          value={patient.gender}
          onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          value={patient.address}
          onChange={(e) => setPatient({ ...patient, address: e.target.value })}
          required
        />
      </Form.Group>
      <Button type="submit">{editingPatient ? 'Save' : 'Add Patient'}</Button>
    </Form>
  );
};

export default PatientForm;
