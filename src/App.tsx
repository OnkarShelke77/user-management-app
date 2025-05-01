import React, { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import { User } from "./assets/types/User";
import "./App.css";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleAddOrUpdateUser = (user: User) => {
    setUsers((prevUsers) => {
      const existingUserIndex = prevUsers.findIndex((u) => u.id === user.id);
      if (existingUserIndex !== -1) {
        // Update user
        const updatedUsers = [...prevUsers];
        updatedUsers[existingUserIndex] = user;
        return updatedUsers;
      }
      return [...prevUsers, user];
    });
    setEditingUser(null);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email} ${user.role} ${user.department} ${user.location}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const existingEmails = users.map((u) => u.email);

  return (
    <div className="container">
      <h1>User Management App</h1>

      <UserForm
        onSubmit={handleAddOrUpdateUser}
        editingUser={editingUser}
        existingEmails={existingEmails}
      />

      <div className="search-bar">
        <input
          list="email-suggestions"
          type="text"
          placeholder="Search for email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <datalist id="email-suggestions">
          {users.map((user) => (
            <option key={user.id} value={user.email}>
            </option>
          ))}
        </datalist>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Role</th>
            <th>Location</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.location}</td>
              <td>{user.department}</td>
              <td className="actions">
                <button className="edit" onClick={() => handleEdit(user)}>
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
