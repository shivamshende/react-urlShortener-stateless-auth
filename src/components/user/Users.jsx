import React, { useState, useEffect } from 'react';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://ur-shortener-stateless-auth-backend-i5w5863rw.vercel.app/usersData', {
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);
  return (
    <div className="users-container">
      <h1>Users List</h1>
      <table className='users-table'>
        <thead>
          <tr>
            <th>Users</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className='users-table'>{user.username.toUpperCase()}</td>
              <td className='users-table'>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;