import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCompanies,removeCompany } from './companiesSlice';
import { companiesData } from '../../shared/companies';
function CompaniesList() {
  const companies = useSelector(state => state.companies);
  const dispatch = useDispatch();
  useEffect(() => {   
      dispatch(setCompanies(companiesData));  // Dispatch action to set companies in the state
  }, [dispatch]);
  return (
    <div>      
      <h1>Companies</h1>
      <ul>      
        {companies.map(company => (
          <li key={company.id}>
            {company.name} - {company.category}
            <button onClick={() => dispatch(removeCompany(company.id))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CompaniesList;