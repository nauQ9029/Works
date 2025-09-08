import { useState } from "react";
import { companiesData } from "../Shared/Companies";

const DemoRenderSimpleData = () => {
    const [companies, setCompanies] = useState(companiesData);
    const [newCompany, setNewCompany] = useState({ name: "", id: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [currentCompany, setCurrentCompany] = useState(null);

    // Create a new company
    const addCompany = () => {
        if (newCompany.name && newCompany.id) {
            setCompanies([...companies, newCompany]);
            setNewCompany({ name: "", id: "" }); // Reset form
        }
    };

    // Delete a company
    const deleteCompany = (id) => {
        setCompanies(companies.filter((company) => company.id !== id));
    };

    // Start editing a company
    const editCompany = (company) => {
        setIsEditing(true);
        setCurrentCompany(company);
    };

    // Update a company
    const updateCompany = () => {
        setCompanies(
            companies.map((company) =>
                company.id === currentCompany.id ? currentCompany : company
            )
        );
        setIsEditing(false);
        setCurrentCompany(null); // Reset editing
    };

    return (
        <>
            <h1>Companies List</h1>
            {/* List all companies */}
            {companies.map((company) => (
                <div key={company.id} style={{ marginBottom: "10px" }}>
                    <h2>{company.name}</h2>
                    <h3>ID: {company.id}</h3>
                    <button onClick={() => deleteCompany(company.id)}>Delete</button>
                    <button onClick={() => editCompany(company)}>Edit</button>
                </div>
            ))}

            <h1>{isEditing ? "Edit Company" : "Add Company"}</h1>

            {/* Add/Edit company form */}
            <input
                type="text"
                placeholder="Company Name"
                value={isEditing ? currentCompany.name : newCompany.name}
                onChange={(e) =>
                    isEditing
                        ? setCurrentCompany({ ...currentCompany, name: e.target.value })
                        : setNewCompany({ ...newCompany, name: e.target.value })
                }
            />
            <input
                type="text"
                placeholder="Company ID"
                value={isEditing ? currentCompany.id : newCompany.id}
                onChange={(e) =>
                    isEditing
                        ? setCurrentCompany({ ...currentCompany, id: e.target.value })
                        : setNewCompany({ ...newCompany, id: e.target.value })
                }
            />
            <button onClick={isEditing ? updateCompany : addCompany}>
                {isEditing ? "Update" : "Add"}
            </button>
        </>
    );
};

// return (
//     <>
//         {/* Render data */}
//         {
//             companies.map((company) => (
//                 <div key={company.id} >
//                     <h1>{company.name}</h1>
//                     <h4>{company.id}</h4>
//                     <h4>{company.category}</h4>
//                     <h4>{company.start}</h4>
//                     <h4>{company.end}</h4>
//                 </div>
//             ))
//         }

//         {/* Create */}

//     </>
// )

export default DemoRenderSimpleData;