import React from 'react';
import { Table, Button } from 'react-bootstrap';

const PatientList = ({ patients, onDelete, onEdit  }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr key={patient.id}>
            <td>{patient.name}</td>
            <td>{patient.age}</td>
            <td>{patient.gender}</td>
            <td>{patient.address}</td>
            <td>
            <Button variant="warning" onClick={() => onEdit(patient)}>Edit</Button>{' '}
              <Button variant="danger" onClick={() => onDelete(patient.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PatientList;
