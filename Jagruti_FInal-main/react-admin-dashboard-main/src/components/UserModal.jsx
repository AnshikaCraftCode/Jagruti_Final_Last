import { useState, useEffect } from "react";

function UserModal({ show, onClose, onSave, editUser }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    role: ""
  });

  useEffect(() => {

    if (editUser) {

      setForm(editUser);

    } else {

      setForm({
        name: "",
        email: "",
        mobile: "",
        role: ""
      });

    }

  }, [editUser]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = () => {

    onSave(form);

  };

  if (!show) return null;

  return (

    <div className="modal d-block">

      <div className="modal-dialog">

        <div className="modal-content">

          <div className="modal-header">

            <h5>

              {editUser ? "Edit User" : "Add User"}

            </h5>

            <button
              className="btn-close"
              onClick={onClose}
            ></button>

          </div>

          <div className="modal-body">

            <input
              className="form-control mb-3"
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              placeholder="Mobile"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
            />

            <select
              className="form-select"
              name="role"
              value={form.role}
              onChange={handleChange}
            >

              <option value="">Select Role</option>

              <option>Admin</option>

              <option>Manager</option>

              <option>User</option>

            </select>

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Save
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default UserModal;