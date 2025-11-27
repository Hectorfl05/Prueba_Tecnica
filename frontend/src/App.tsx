import { useState } from "react";
import TransactionsPage from "./pages/TransactionsPage";
import DashboardPage from "./pages/DashboardPage";
import "./App.css";

/**
 * Componente principal de la aplicación
 *
 * Se encarga de gestionar la navegación entre las páginas (pestañas) de Transacciones y Dashboard,
 * las cuales se encuentran en la barra de navegación en la parte superior de la página.
 *
 */

function App() {
  const [currentPage, setCurrentPage] = useState<"transactions" | "dashboard">(
    "transactions"
  );

  return (
    <div className="app">
      <nav className="app-nav">
        <button
          className={currentPage === "transactions" ? "active" : ""}
          onClick={() => setCurrentPage("transactions")}
        >
          Transacciones
        </button>
        <button
          className={currentPage === "dashboard" ? "active" : ""}
          onClick={() => setCurrentPage("dashboard")}
        >
          Dashboard
        </button>
        <img src="/Logo NI.png" alt="Logo" className="app-logo" />
      </nav>
      <main>
        {currentPage === "transactions" && <TransactionsPage />}
        {currentPage === "dashboard" && <DashboardPage />}
      </main>
    </div>
  );
}

export default App;
