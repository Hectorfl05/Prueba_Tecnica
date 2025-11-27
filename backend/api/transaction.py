from fastapi import APIRouter
from controllers.transaction import (
    obtener_transacciones, 
    nueva_transaccion, 
    generar_resumen_transacciones, 
    generar_resumen_por_categoria,
    recopilar_categorias
)
from schemas.transaction import Transaction

# Enrutador para las API's de las transacciones
router = APIRouter(
    prefix="/transactions",
    tags=["transactions"]
)


# Ruta para obtener todas las transacciones
@router.get("/", status_code=200)
def obtener_todas_las_transacciones():
    return obtener_transacciones()


# Ruta para agregar una nueva transacción
@router.post("/", status_code=201, response_model=Transaction)
def agregar_transaccion(transaction: Transaction):
    return nueva_transaccion(transaction)


# Ruta para obtener un resumen de las transacciones
@router.get("/summary", status_code=200)
def resumen_transacciones():
    return generar_resumen_transacciones()


# Ruta para obtener los resúmenes por categoría
@router.get("/summary_by_category", status_code=200)
def resumen_por_categoria():
    return generar_resumen_por_categoria()

# Ruta para obtener las categorías disponibles en el sistema
@router.get("/categories", status_code=200)
def obtener_categorias():
    return recopilar_categorias()


