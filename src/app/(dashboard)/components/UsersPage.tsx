import React from 'react'
import TableComponent from '../reusables/TableComponent'

export default function UsersPage() {
  // Define table headers
  const headers = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' }
  ];

  // Sample data - replace with your actual data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
    // Add more users as needed
  ];

  return (
    <div className='h-[70vh]'>
      <TableComponent 
        headers={headers}
        items={users}
      />
    </div>
  )
}