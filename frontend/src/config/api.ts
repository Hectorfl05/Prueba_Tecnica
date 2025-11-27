/**
 * Configuración de la API para las llamadas al backend
 * Sirve para centralizar las URLs y configuraciones del backend
 * 
 * (Modificar la URL si el backend está alojado en otro puerto)
 */


export const API_BASE_URL = "http://localhost:8000";


// Endpoints de la API
export const API_ENDPOINTS = {
  transactions: `${API_BASE_URL}/transactions`,
  transactionsSummary: `${API_BASE_URL}/transactions/summary`,
  transactionsSummaryByCategory: `${API_BASE_URL}/transactions/summary_by_category`,
  transactionsCategories: `${API_BASE_URL}/transactions/categories`,
};
