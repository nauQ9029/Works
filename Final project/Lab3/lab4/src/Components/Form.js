// AddAccountForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAccount } from '../Components/storeAccounts';
import { addAccount as addAccountService } from '../Components/accountsService';

function AddAccountForm() {
  const [accountData, setAccountData] = useState({
    accountId: '',
    accountHolder: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipcode: ''
      },
      contact: {
        email: '',
        phone: ''
      }
    }
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountData(prevState => ({
      ...prevState,
      accountHolder: {
        ...prevState.accountHolder,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAccount = await addAccountService(accountData);
    dispatch(addAccount(newAccount));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
      {/* Add other form fields as necessary */}
      <button type="submit">Add Account</button>
    </form>
  );
}

export default AddAccountForm;
