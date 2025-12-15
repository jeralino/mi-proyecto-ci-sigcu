import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // 1. Importar Link y useNavigate

export default function Login({ onLogin }) {
  const navigate = useNavigate(); 

  // --- ESTADOS ORIGINALES ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --- ESTADOS NUEVOS (Pestañas y Admin) ---
  const [activeTab, setActiveTab] = useState("client"); // 'client' o 'admin'
  const [adminId, setAdminId] = useState("");
  const [adminName, setAdminName] = useState("");

  // --- FUNCIÓN LOGIN CLIENTE ---
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  // --- FUNCIÓN LOGIN ADMIN (BACKEND) ---
  // NOTA: Recuerda cambiar localhost:4000 por la URL de Render cuando despliegues el backend
  const handleAdminLogin = async (e) => {
    e.preventDefault();

    if (adminId.trim() === "" || adminName.trim() === "") {
      alert("Por favor ingrese ID y Nombre del Administrador");
      return;
    }

    try {
      // URL del backend (Local para pruebas, luego cámbiala)
      const response = await fetch("http://localhost:4000/api/auth/admin-login-view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId, adminName }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminName", data.user.nombre);
        localStorage.setItem("adminRole", data.user.rol);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("token", data.token); // Guardar Token es crítico

        console.log("Acceso concedido:", data.message);
        navigate("/admin-dashboard");
      } else {
        alert(data.message || data.error || "Error al ingresar.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor (Backend no disponible).");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg border-0" style={{ width: "420px" }}>
        <div className="card-body p-5">
          <h3 className="text-center mb-4 fw-bold">
            <i className="bi bi-mortarboard-fill me-2 text-primary"></i>
            UTM – Comedor Inteligente
          </h3>

          {/* --- PESTAÑAS (SWITCH) --- */}
          <div className="d-flex justify-content-center mb-4 gap-2">
            <button
              type="button"
              className={`btn ${activeTab === "client" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setActiveTab("client")}
            >
              Cliente
            </button>
            <button
              type="button"
              className={`btn ${activeTab === "admin" ? "btn-danger" : "btn-outline-danger"}`}
              onClick={() => setActiveTab("admin")}
            >
              Admin View
            </button>
          </div>

          {/* --- FORMULARIO CLIENTE --- */}
          {activeTab === "client" ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Correo institucional</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="ejemplo@utm.edu.ec"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Contraseña</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="•••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="btn btn-primary w-100 btn-lg">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Iniciar sesión
              </button>

              <p className="text-center mt-4">
                ¿No tienes cuenta?{" "}
                {/* 2. CORRECCIÓN CRÍTICA: Usar Link en lugar de <a> para evitar recargas */}
                <Link to="/register" className="text-primary fw-semibold">
                  Crear cuenta
                </Link>
              </p>
            </form>
          ) : (
            /* --- FORMULARIO ADMIN --- */
            <form onSubmit={handleAdminLogin}>
              <div className="mb-3">
                <label className="form-label fw-semibold text-danger">
                  ID Único de Administrador
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Ej: 3 (ID numérico)"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold text-danger">
                  Nombre del Administrador
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Ej: Jorge Admin"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                />
              </div>

              <button className="btn btn-danger w-100 btn-lg">
                <i className="bi bi-shield-lock-fill me-2"></i>
                Ingresar Admin
              </button>
              
              <p className="text-center mt-4" style={{ visibility: "hidden" }}>
                 Espacio reservado
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}