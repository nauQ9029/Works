// AccountsList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAccounts, removeAccount } from '../Components/storeAccounts';
import { fetchAccounts, deleteAccount } from '../Components/accountsService';

function AccountsList() {
  const accounts = useSelector(state => state.accounts);
  const dispatch = useDispatch();

  const handleDelete = async (accountId) => {
    try {
      await deleteAccount(accountId);
      dispatch(removeAccount(accountId)); 
    } catch (error) {
      console.error('Failed to delete the account:', error);
    }
  };

  useEffect(() => {
    const loadAccounts = async () => {
      const accountsData = await fetchAccounts();
      dispatch(setAccounts(accountsData));
    };

    loadAccounts();
  }, [dispatch]);

  return (
    <div>
      <h1>Accounts</h1>
      <ul>
        {accounts.map(account => (
          <li key={account.accountId}>
            {account.accountHolder.firstName} {account.accountHolder.lastName} - {account.accountHolder.contact.email}
            <button onClick={() => handleDelete(account.accountId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AccountsList;
