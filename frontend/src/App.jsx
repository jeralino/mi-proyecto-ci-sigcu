import { HashRouter, Routes, Route, useNavigate } from "react-router-dom"; // 1. HashRouter y useNavigate
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Comedores from "./pages/Comedores";
import Comedor from "./pages/Comedor";
import AdminDashboard from './pages/AdminDashboard';

// URL de tu backend desplegado (REEMPLAZAR CON LA REAL)
const API_BASE_URL = "https://tu-backend-en-dockerhub-o-render.com/api/auth";

// Componente interno para manejar la lógica de navegación
function AppContent() {
  const navigate = useNavigate(); // 2. Hook para navegar sin recargar

  // Función para registrar usuario
  const handleRegister = async (form) => {
    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Cuenta creada correctamente. Ahora inicia sesión.");
        navigate("/login"); // 3. Usamos navigate en vez de window.location
      } else {
        alert(data.error || "Error creando la cuenta");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error conectando al servidor");
    }
  };

  // Función para iniciar sesión
  const handleLogin = async (form) => {
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Bienvenido!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard"); // 3. Usamos navigate en vez de window.location
      } else {
        alert(data.error || "Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error conectando al servidor");
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register onRegister={handleRegister} />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/comedores/:facultadId" element={<Comedores />} />
      <Route path="/comedor/:comedorId" element={<Comedor />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

function App() {
  return (
    // 4. Envolvemos todo en HashRouter
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;