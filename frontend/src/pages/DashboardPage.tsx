import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../config/api";
import "./DashboardPage.css";

// Interfaz para el resumen general de transacciones
interface Summary {
  total_income: number;
  total_expense: number;
  net_total: number;
}

// Interfaz para el resumen de transacciones agrupadas por categoría
interface CategorySummary {
  [category: string]: {
    total_income: number;
    total_expense: number;
    net_total: number;
  };
}

/**
 * Página del Dashboard financiero
 *
 * Esta página muestra el resumen general de ingresos, gastos y balance neto de todas
 * las transacciones registradas, así como un desglose por las categorías de
 * las transacciones, además tambien muestra el prototipo de un reporte de Looker Studio.
 */
const DashboardPage = () => {
  // Estado para las variables de la pagina del dashboar
  const [summary, setSummary] = useState<Summary | null>(null);
  const [categorySummary, setCategorySummary] = useState<CategorySummary>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // API del reporte embedido de Looker Studio

  const LOOKER_STUDIO_URL =
    "https://lookerstudio.google.com/embed/reporting/be85b78c-d7c1-4a7f-8282-de36f0781402/page/kIV1C";

  useEffect(() => {
    fetchSummaries();
  }, []);

  /**
   * Se obtienen los resúmenes de transacciones desde la API, cargando tanto
   * el resumen general como el resumen por categoría.
   */
  const fetchSummaries = async () => {
    try {
      setLoading(true);

      const summaryResponse = await fetch(API_ENDPOINTS.transactionsSummary);
      if (!summaryResponse.ok) {
        throw new Error("Error al cargar el resumen");
      }
      const summaryData = await summaryResponse.json();
      setSummary(summaryData);

      const categoryResponse = await fetch(
        API_ENDPOINTS.transactionsSummaryByCategory
      );
      if (!categoryResponse.ok) {
        throw new Error("Error al cargar el resumen por categoría");
      }
      const categoryData = await categoryResponse.json();
      setCategorySummary(categoryData.categories || {});

      setError("");
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Error al cargar los datos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted fs-5">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="mb-4">
        <h1 className="display-5 fw-bold text-primary">Dashboard Financiero</h1>
        <p className="text-muted">
          Resumen de tus transacciones e indicadores financieros
        </p>
      </div>

      {/* Resumen general */}
      {summary && (
        <div className="mb-4">
          <h2 className="h4 mb-3 text-secondary">Resumen General</h2>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm summary-card-income">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-arrow-up-circle-fill fs-3 me-2"></i>
                    <h3 className="card-title mb-0 fs-6 text-white-50">
                      Ingresos Totales
                    </h3>
                  </div>
                  <p className="display-6 fw-bold mb-0 text-white">
                    ${summary.total_income.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm summary-card-expense">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-arrow-down-circle-fill fs-3 me-2"></i>
                    <h3 className="card-title mb-0 fs-6 text-white-50">
                      Gastos Totales
                    </h3>
                  </div>
                  <p className="display-6 fw-bold mb-0 text-white">
                    ${summary.total_expense.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm summary-card-net">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-wallet2 fs-3 me-2"></i>
                    <h3 className="card-title mb-0 fs-6 text-white-50">
                      Balance Neto
                    </h3>
                  </div>
                  <p className="display-6 fw-bold mb-0 text-white">
                    ${summary.net_total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resumen por categoría */}
      {Object.keys(categorySummary).length > 0 && (
        <div className="mb-4">
          <h2 className="h4 mb-3 text-secondary">Resumen por Categoría</h2>
          <div className="row g-3">
            {Object.entries(categorySummary).map(([category, data]) => (
              <div key={category} className="col-lg-4 col-md-6">
                <div className="card border-0 shadow-sm h-100 category-card">
                  <div className="card-header bg-primary text-white">
                    <h3 className="card-title mb-0 text-capitalize h5">
                      <i className="bi bi-tag-fill me-2"></i>
                      {category}
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Ingresos:</span>
                      <span className="fw-bold text-success">
                        ${data.total_income.toFixed(2)}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Gastos:</span>
                      <span className="fw-bold text-danger">
                        ${data.total_expense.toFixed(2)}
                      </span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <span className="fw-semibold">Balance:</span>
                      <span
                        className={`fw-bold ${
                          data.net_total >= 0 ? "text-success" : "text-danger"
                        }`}
                      >
                        ${data.net_total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reporte embebido de Looker Studio  */}
      <div className="mb-4">
        <h2 className="h4 mb-3 text-secondary">Reporte de Looker Studio</h2>
        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <div className="ratio ratio-16x9">
              <iframe
                src={LOOKER_STUDIO_URL}
                title="Looker Studio Report"
                className="rounded"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
