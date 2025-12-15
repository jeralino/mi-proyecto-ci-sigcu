import { HashRouter, Routes, Route } from "react-router-dom"; // CAMBIO 1: USAR HashRouter
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Comedores from "./pages/Comedores";
import Comedor from "./pages/Comedor";
import AdminDashboard from './pages/AdminDashboard';

// CAMBIO 2: Definir la URL base de tu Backend desplegado
// ¡REEMPLAZA ESTA URL CON TU URL REAL DEL BACKEND!
const API_BASE_URL = "https://sigcu-backend-api.com/api/auth"; // Ejemplo

function App() {
  // Función para registrar usuario
  const handleRegister = async (form) => {
    try {
      const res = await fetch(`${API_BASE_URL}/register`, { // Usar API_BASE_URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Cuenta creada correctamente. Ahora inicia sesión.");
        window.location.href = "#/login"; // Redireccionar usando HashRouter
      } else {
        alert(data.error || "Error creando la cuenta");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error conectando al servidor. Verifica la URL del Backend.");
    }
  };

  // Función para iniciar sesión
  const handleLogin = async (form) => {
    try {
      const res = await fetch(`${API_BASE_URL}/login`, { // Usar API_BASE_URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Bienvenido!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "#/dashboard"; // Redireccionar usando HashRouter
      } else {
        alert(data.error || "Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error conectando al servidor. Verifica la URL del Backend.");
    }
  };

  return (
    // CAMBIO 3: Usar HashRouter para compatibilidad con GitHub Pages
    <HashRouter> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/comedores/:facultadId" element={<Comedores />} />
        <Route path="/comedor/:comedorId" element={<Comedor />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </HashRouter>
  );
}

export default App;