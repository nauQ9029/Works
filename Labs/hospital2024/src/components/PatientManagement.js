import React, { lazy, useContext, useState } from 'react';
import { PatientContext } from '../context/PatientContext';
import { deletePatient, updatePatient } from '../services/patientService'; // Import hàm deletePatient
// import PatientList from './PatientList';
// import PatientForm from './PatientForm';
import DeleteModal from './DeleteModal';
import { loadWithDelay } from '../utils/loadWithDelay';
const PatientList = lazy(()=> loadWithDelay(() => import('./PatientList'),2000));
const PatientForm = lazy(()=> loadWithDelay(() => import('./PatientForm'),2000));

const PatientManagement = () => {
  const { state, dispatch } = useContext(PatientContext);
  const [showModal, setShowModal] = useState(false);
  const [deletePatientId, setDeletePatientId] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null); // Thêm trạng thái cho bệnh nhân đang chỉnh sửa

  const handleDelete = (id) => {
    setDeletePatientId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    await deletePatient(deletePatientId);
    dispatch({ type: 'DELETE_PATIENT', payload: deletePatientId });
    setShowModal(false);
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient);
  };

  const handleSave = async (updatedPatient) => {
    const updated = await updatePatient(updatedPatient);
    dispatch({ type: 'EDIT_PATIENT', payload: updated });
    setEditingPatient(null);
  };

  return (
    <div className="patient-management">
      <h2>Patient Management</h2>
      <PatientForm onSave={handleSave} editingPatient={editingPatient}/>
      {state.loading ? (
        <p>Loading...</p>
      ) : (
        <PatientList patients={state.patients} onDelete={handleDelete} onEdit={handleEdit} />
      )}
      <DeleteModal show={showModal} onHide={() => setShowModal(false)} onConfirm={confirmDelete} />
    </div>
  );
};

export default PatientManagement;
