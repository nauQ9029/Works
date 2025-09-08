import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCompanies, removeCompany } from './store_companies';
import { fetchCompanies, deleteCompany } from '../Services/companiesService';

function CompaniesList() {
  const companies = useSelector(state => state.companies);
  const dispatch = useDispatch();
 
  const handleDelete = async (id) => { 
    try {
      await deleteCompany(id);
      dispatch(removeCompany(id)); // Dispatch the action to remove company from Redux state
    } catch (error) {
      console.error('Failed to delete the company:', error);
    }
  };
  useEffect(() => {
    const loadCompanies = async () => {
      const companiesData = await fetchCompanies();
      dispatch(setCompanies(companiesData));  // Dispatch action to set companies in the state
    };

    loadCompanies();
  }, [dispatch]);
  return (
    <div>      
      <h1>Companies</h1>
      <ul>      
        {companies.map(company => (
          <li key={company.id}>
            {company.name} - {company.category}
            <button onClick={() => handleDelete(company.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CompaniesList;