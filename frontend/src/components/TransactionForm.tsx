import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../config/api";
import "./TransactionForm.css";

// Props para el componente TransactionForm
interface TransactionFormProps {
  // Callback ejecutado cuando se agrega exitosamente una transacción
  onTransactionAdded: () => void;
  // Callback para mostrar mensajes de éxito
  onSuccess: (message: string) => void;
  // Callback para mostrar mensajes de error
  onError: (message: string) => void;
}

/**
 * Formulario para agregar nuevas transacciones
 *
 * Este formulario permite al usuario ingresar la fecha, descripción, monto y categoría de
 * cada transacción, validando los datos antes de enviarlos a la API; mostrando mensajes
 * de exito o error según el resultado o los datos ingresados.
 *
 */
const TransactionForm = ({
  onTransactionAdded,
  onSuccess,
  onError,
}: TransactionFormProps) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Carga las categorías disponibles desde la API

    const fetchCategories = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.transactionsCategories);
        if (!res.ok) throw new Error("Error al cargar las categorías");
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err) {
        const error = err as Error;
        console.error(err);
        onError(error.message || "Error al cargar las categorías");
      }
    };

    fetchCategories();
  }, [onError]);

  //Maneja los errores de validación y envío del formulario

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      onError("Por favor ingresa la fecha");
      return;
    }

    if (!description.trim()) {
      onError("Por favor ingresa la descripción");
      return;
    }

    if (!amount) {
      onError("Por favor ingresa el monto");
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) {
      onError("El monto debe ser un número válido");
      return;
    }

    if (!category.trim()) {
      onError("Por favor ingresa la categoría");
      return;
    }

    setLoading(true);

    //Envia la información de la nueva transacción a la API al backend
    try {
      const response = await fetch(API_ENDPOINTS.transactions, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date,
          description: description.trim(),
          amount: amountNum,
          category: category.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error al crear transacción");
      }

      // Limpia el formulario
      setDate("");
      setDescription("");
      setAmount("");
      setCategory("");

      // Notifica que la operación fue exitosa
      onSuccess("Transacción agregada exitosamente");
      onTransactionAdded();
    } catch (err) {
      const error = err as Error;
      // Sino fue exitosa, notifica que la operación falló
      onError(error.message || "Error al agregar transacción");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-4">Agregar Transacción</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Fecha
            </label>
            <input
              type="date"
              id="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Descripción
            </label>
            <input
              type="text"
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: Venta de Inventario XYZ"
              maxLength={100}
              disabled={loading}
            />
            <small className="form-text text-primary d-block mt-2">
              {description.length}/100 caracteres
            </small>
          </div>

          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Monto
            </label>
            <input
              type="number"
              id="amount"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ej: 100.00 o -50.00"
              disabled={loading}
              onWheel={(e) => e.currentTarget.blur()}
            />
            <small
              className="form-text text-primary fw-bold d-block mt-2 p-2 rounded"
              style={{ backgroundColor: "#fff3cd" }}
            >
              💡 Usa números positivos para ingresos y negativos para gastos
            </small>
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Categoría
            </label>
            <select
              id="category"
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="text-center mb-2">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-50"
            >
              {loading ? "Agregando..." : "Agregar Transacción"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
