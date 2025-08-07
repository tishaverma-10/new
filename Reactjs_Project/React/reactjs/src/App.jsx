import React from 'react';
import UserList from './components/userList';

const App = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Fetch Users from API</h1>
      <UserList />
    </div>
  );
};

export default App;
