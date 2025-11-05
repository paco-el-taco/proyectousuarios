import React, { useState } from "react";
import UserList from "./components/userList";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [usuario, setUsuario] = useState(null);

  const handleLogout = () => {
    setUsuario(null);
  };

  return (
    <div>
      {!usuario ? (
        <Login onLogin={setUsuario} />
      ) : (
        <>
          <nav className="navbar navbar-dark bg-dark mb-4">
            <div className="container d-flex justify-content-between">
              <span className="navbar-brand">
                Bienvenido, {usuario.nombre}
              </span>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </div>
          </nav>

          <UserList />
        </>
      )}
    </div>
  );
}

export default App;

