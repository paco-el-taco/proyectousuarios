import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });
  const [editId, setEditId] = useState(null);
  const API = "http://localhost:5001/api/usuarios";

  const getUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API, form);
    }
    setForm({ nombre: "", email: "", telefono: "" });
    getUsers();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    getUsers();
  };

  const handleEdit = (u) => {
    setForm({ nombre: u.nombre, email: u.email, telefono: u.telefono });
    setEditId(u.id);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gestión de Usuarios</h2>

      {}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Teléfono"
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              />
            </div>
            <div className="col-md-1 d-grid">
              <button className={`btn ${editId ? "btn-secondary" : "btn-primary"}`}>
                {editId ? "Actualizar" : "Agregar"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Tabla */}
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-success">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td>{u.telefono}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(u)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(u.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No hay usuarios registrados 😅
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserList;


