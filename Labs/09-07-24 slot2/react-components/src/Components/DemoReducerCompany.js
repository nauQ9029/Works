import React, { useReducer } from "react";
import { companiesData } from "../Shared/Companies";

// Define the initial state
const initialState = {
    companies: companiesData
};

function companyReducer(state, action) {
    switch (action.type) {
        case 'add':
            const newCompany = {
                id: state.companies.length + 1,  // Add an id for each new company
                name: "Company Ten", 
                category: "Finance", 
                start: 1981, 
                end: 2004
            };
            return { ...state, companies: [...state.companies, newCompany] };  // Spread the entire state, then update companies array
        case 'delete':
            return { ...state, companies: state.companies.filter(company => company.id !== action.id) };
        case 'update':
            return { ...state, companies: state.companies.map(company => 
                company.id === action.id ? { ...company, name: action.name } : company
            ) };
        default:
            throw new Error("Unknown action type");
    }
}

function CompanyReducer() {
    const [state, dispatch] = useReducer(companyReducer, initialState);
    return (
        <>
            {state.companies.map((company) => (
                <div key={company.id}>
                    <h1>{company.id} {company.name}</h1>
                    <button onClick={() => dispatch({ type: 'delete', id: company.id })}>Delete</button>
                    <button onClick={() => dispatch({ type: 'update', id: company.id, name: "Updated Company" })}>Update</button>
                </div>
            ))}
            <button onClick={() => dispatch({ type: 'add' })}>Add</button>
        </>
    );
}

export default CompanyReducer;
