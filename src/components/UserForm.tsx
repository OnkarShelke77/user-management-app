import React, { useState, useEffect } from "react";
import { User } from "../assets/types/User";

interface Props {
  onSubmit: (user: User) => void;
  editingUser: User | null;
  existingEmails: string[];
}

type UserField = keyof Omit<User, "id">;

const UserForm: React.FC<Props> = ({ onSubmit, editingUser, existingEmails }) => {
  const [user, setUser] = useState<User>(
    editingUser ?? {
      id: Date.now(),
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      role: "",
      location: "",
      department: ""
    }
  );

  useEffect(() => {
    if (editingUser) setUser(editingUser);
  }, [editingUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const { id, ...rest } = user;
    if (Object.values(rest).some((v) => typeof v !== "string" || v.trim() === "")) {
      alert("All fields are mandatory!");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(user.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!phoneRegex.test(user.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
  
    const isDuplicateEmail =
      existingEmails.includes(user.email) && (!editingUser || user.email !== editingUser.email);
  
    if (isDuplicateEmail) {
      alert("Email already exists!");
      return;
    }
  
    onSubmit(user);
    setUser({
      id: Date.now(),
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      role: "",
      location: "",
      department: ""
    });
  };
  

  
  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">FIRST NAME <span className="required">*</span> </label>
          <input
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">LAST NAME <span className="required">*</span></label>
          <input
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="phone">PHONE <span className="required">*</span></label>
          <input
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">EMAIL ID <span className="required">*</span></label>
          <input
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email ID"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="role">ROLE <span className="required">*</span> </label>
          <input
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
            placeholder="Role"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">LOCATION <span className="required">*</span></label>
          <input
            id="location"
            name="location"
            value={user.location}
            onChange={handleChange}
            placeholder="Location"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group half-width">
          <label htmlFor="department">DEPARTMENT <span className="required">*</span></label>
          <input
            id="department"
            name="department"
            value={user.department}
            onChange={handleChange}
            placeholder="Department"
            required
          />
        </div>
      </div>

      <button type="submit">{editingUser ? "Update" : "Add"}</button>
    </form>
  );
};

export default UserForm;
