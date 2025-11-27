import { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import FlashAlert from "../components/FlashAlert";
import "./TransactionsPage.css";

/**
 * Página de gestión de transacciones
 *
 * Esta página contiene el formulario para agregar nuevas transacciones con su
 * respectiva información y muestra al usuario la lista completa de las
 * transacciones existentes en el sistema. Además, maneja  alertas y mensajes de éxito
 * y error para informar al usuario sobre el estado de las operaciones.
 */
const TransactionsPage = () => {
  const [refresh, setRefresh] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  /**
   * Incrementa el contador de refresh para actualizar la lista de transacciones
   */
  const handleTransactionAdded = () => {
    setRefresh((prev) => prev + 1);
  };

  /**
   * Muestra una alerta de éxito con el mensaje proporcionado
   * @param message - Mensaje a mostrar en la alerta
   */
  const handleSuccess = (message: string) => {
    setAlertMessage(message);
    setAlertType("success");
  };

  /**
   * Muestra una alerta de error con el mensaje proporcionado
   * @param message - Mensaje de error a mostrar
   */
  const handleError = (message: string) => {
    setAlertMessage(message);
    setAlertType("error");
  };

  return (
    <div className="transactions-page">
      <div className="page-header">
        <h1>Gestión de Transacciones</h1>
      </div>

      {alertMessage && (
        <FlashAlert
          mensaje={alertMessage}
          tipo={alertType}
          onClose={() => setAlertMessage("")}
        />
      )}

      <div className="page-content">
        <TransactionForm
          onTransactionAdded={handleTransactionAdded}
          onSuccess={handleSuccess}
          onError={handleError}
        />
        <TransactionList refresh={refresh} />
      </div>
    </div>
  );
};

export default TransactionsPage;
