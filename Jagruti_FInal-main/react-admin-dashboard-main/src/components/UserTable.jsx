import { FaEdit, FaTrash } from "react-icons/fa";

function UserTable({ users, onEdit, onDelete }) {
  return (
    <div className="card shadow border-0">

      <div className="card-body">

        <table className="table table-hover align-middle">

          <thead className="table-dark">

            <tr>

              <th>#</th>

              <th>Name</th>

              <th>Email</th>

              <th>Mobile</th>

              <th>Role</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user, index) => (

              <tr key={user.id}>

                <td>{index + 1}</td>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.mobile}</td>

                <td>{user.role}</td>

                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEdit(user)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(user.id)}
                  >
                    <FaTrash />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default UserTable;