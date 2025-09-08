// App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts, addAccount, updateAccount, deleteAccount  } from '../redux/accountSlide';
// import { fetchAccounts, addAccount, updateAccount, deleteAccount } from '../redux/accountSlice';

const View = () => {
  const dispatch = useDispatch();
  const { accounts, loading, error } = useSelector((state) => state.accounts);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const handleAddAccount = () => {
    const newAccount = {
      accountId: `ACC${Math.floor(Math.random() * 100000)}`,
      accountHolder: {
        firstName: 'New',
        lastName: 'Account',
        dateOfBirth: '2000-01-01',
        address: {
          street: '123 New St',
          city: 'Newville',
          state: 'NewState',
          zipcode: '12345',
        },
        contact: {
          email: 'new.account@example.com',
          phone: '+1122334455',
        },
      },
    };
    dispatch(addAccount(newAccount));
  };

  // const handleUpdateAccount = (accountId) => {
  //   const updatedAccount = {
  //     accountId,
  //     accountHolder: {
  //       firstName: 'Updated',
  //       lastName: 'Account',
  //       dateOfBirth: '1999-09-09',
  //     },
  //   };
  //   dispatch(updateAccount({ accountId, updatedAccount }));
  // };


  const handleUpdateAccount = (id) => {
    const accountToUpdate = accounts.find(account => account.id === id);

    const updatedAccount = {
      ...accountToUpdate, // giữ lại các trường cũ
      accountHolder: {
        ...accountToUpdate.accountHolder, // giữ lại các trường con cũ trong accountHolder
        firstName: 'UpdatedFirstName',
        lastName: 'UpdatedLastName',
      },
    };
    dispatch(updateAccount({ id, updatedAccount }));
  };

  const handleDeleteAccount = (accountId) => {
    dispatch(deleteAccount(accountId));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Account Management</h1>
      <button onClick={handleAddAccount} className='btn btn-primary'>Add Account</button>
      <ul>
        {accounts.map((account) => (
          <li key={account.accountId}>
              <p><strong>Account ID:</strong> {account.accountId}</p>
            <p><strong>Name:</strong> {account.accountHolder.firstName} {account.accountHolder.lastName}</p>
            <p><strong>Date of Birth:</strong> {account.accountHolder.dateOfBirth}</p>
            <p><strong>Address:</strong> {account.accountHolder.address.street}, {account.accountHolder.address.city}, {account.accountHolder.address.state}, {account.accountHolder.address.zipcode}</p>
            <p><strong>Email:</strong> {account.accountHolder.contact.email}</p>
         
            <button onClick={() => handleUpdateAccount(account.id)} className='btn btn-warning'>Update</button>
            <button onClick={() => handleDeleteAccount(account.accountId)} className='btn btn-danger'>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default View;
