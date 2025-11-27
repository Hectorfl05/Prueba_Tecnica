from db import transactions, categories
from schemas.transaction import Transaction

# =========================================================
# Funciones de manejo de la lógica de las transacciones
# =========================================================


def obtener_transacciones() -> list[Transaction]:
    """
    Función que devuelve todas las transacciones almacenadas
    en memoria.
    """
    return transactions


def nueva_transaccion(transaction: Transaction) -> Transaction:
    """
    Función que crea una nueva transacción con los datos proporcionados en 
    los parámetros, creando un id incremental.
    """
    transaction.id = len(transactions) + 1
    transactions.append(transaction)
    return transaction


def generar_resumen_transacciones() -> dict[str, float]:
    """
    Función que genera un resumen de las transacciones almacenadas,
    calculando el total de ingresos, gastos y el total neto.
    """
    total_income = sum(t.amount for t in transactions if t.amount > 0)
    total_expense = sum(t.amount for t in transactions if t.amount < 0)  
    net_total = total_income + total_expense
    return {
        "total_income": total_income,
        "total_expense": total_expense,
        "net_total": net_total
    }


def generar_resumen_por_categoria() -> dict[str, dict]:
    """
    Función que genera un resumen de las transacciones almacenadas,
    calculando el total de ingresos, gastos y el total neto, agrupadas por
    la categoría de la transacción.
    """
    category_summary = {}
    for transaccion in transactions:
        if transaccion.category not in category_summary:
            category_summary[transaccion.category] = {
                "total_income": 0,
                "total_expense": 0,
                "net_total": 0
            }
        categoria_actual = category_summary[transaccion.category]
        if transaccion.amount > 0:
            categoria_actual["total_income"] += transaccion.amount
        else:
            categoria_actual["total_expense"] += transaccion.amount
        categoria_actual["net_total"] = categoria_actual["total_income"] + categoria_actual["total_expense"]
    return {
        "categories": category_summary
    }


def recopilar_categorias() -> dict[str, list[str]]:
    """
    Función que devuelve la lista de categorías disponibles
    para las transacciones.
    """
    return {
        "categories": list(categories)
    }