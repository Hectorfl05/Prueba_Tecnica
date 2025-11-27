import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../config/api";
import "./TransactionList.css";

// Interfaz que representa una transacción
interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: string;
}

// Props para el componente TransactionList
interface TransactionListProps {
  // Contador que al cambiar fuerza la recarga de transacciones
  refresh: number;
}

/**
 * Lista de transacciones registradas
 *
 * Este componente consiste en una tabla que
 * muestra todas las transacciones con la descripcion, monto y categoría;
 * además maneja estados de carga y errores al obtener los datos desde la API.
 *
 */

const TransactionList = ({ refresh }: TransactionListProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, [refresh]);

  //Obtiene todas las transacciones desde la API

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.transactions);

      if (!response.ok) {
        throw new Error("Error al cargar las transacciones");
      }

      const data = await response.json();
      setTransactions(data);
      setError("");
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Error al cargar las transacciones");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando transacciones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-4">Lista de Transacciones</h2>
        {transactions.length === 0 ? (
          <p className="text-center text-muted py-4">
            No hay transacciones registradas
          </p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Descripción</th>
                  <th>Monto</th>
                  <th>Categoría</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td
                      className={
                        transaction.amount >= 0
                          ? "text-success fw-bold"
                          : "text-danger fw-bold"
                      }
                    >
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td>
                      <span className="badge bg-primary rounded-pill">
                        {transaction.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
