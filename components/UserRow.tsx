import React from 'react'

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface IProps {
    user: User
 }
// deconstructed props
export default function UserRow({user}:IProps) {
debugger
  return (
        <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
        </tr>
  )
}
