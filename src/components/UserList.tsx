import React from "react";
import { User } from "../assets/types/User";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
}

const UserList: React.FC<Props> = ({ users, onEdit }) => (
  <table>
    <thead>
      <tr>
        <th>First</th><th>Last</th><th>Phone</th><th>Email</th><th>Role</th><th>Location</th><th>Department</th><th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          <td>{user.firstName}</td><td>{user.lastName}</td><td>{user.phone}</td><td>{user.email}</td>
          <td>{user.role}</td><td>{user.location}</td><td>{user.department}</td>
          <td><button onClick={() => onEdit(user)}>Edit</button></td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserList;
