// 1. IMPORTANTE: Cambiamos BrowserRouter por HashRouter
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom"; 
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Comedores from "./pages/Comedores";
import Comedor from "./pages/Comedor";
import AdminDashboard from './pages/AdminDashboard';

// NOTA: Cuando subas tu backend a la nube, cambiarás esta URL.
// Por ahora, si solo quieres arreglar el 404 del frontend, déjalo así, 
// pero recuerda que el login no funcionará hasta que el backend sea público.
const API_BASE_URL = "http://localhost:4000/api/auth"; 

// Creamos un componente interno para poder usar el hook 'useNavigate'
function AppContent() {
  const navigate = useNavigate(); 

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
        navigate("/login"); // Navegación correcta
      } else {
        alert(data.error || "Error creando la cuenta");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error conectando al servidor");
    }
  };

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
        navigate("/dashboard"); // Navegación correcta
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
    // 2. Aquí envolvemos todo con HashRouter
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;