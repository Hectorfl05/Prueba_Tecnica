import pytest
from fastapi.testclient import TestClient
from main import app
from db import transactions

# Cliente de prueba para hacer peticiones HTTP
client = TestClient(app)


@pytest.fixture(autouse=True)
def reset_transactions():
    """
    Fixture que se ejecuta antes de cada prueba para limpiar
    la lista de transacciones y mantener el estado consistente
    """
    transactions.clear()
    yield
    transactions.clear()


def test_health_check():
    """
    Test 1: Verifica que el endpoint de health check responda correctamente
    """
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_crear_transaccion_exitosa():
    """
    Test 2: Verifica que se pueda crear una transacción válida correctamente
    """
    nueva_transaccion = {
        "date": "27-11-2025",
        "description": "Ventas de productos",
        "amount": 150.50,
        "category": "Ventas"
    }
    
    response = client.post("/transactions/", json=nueva_transaccion)
    
    assert response.status_code == 201
    data = response.json()
    assert data["id"] == 1
    assert data["date"] == nueva_transaccion["date"]
    assert data["description"] == nueva_transaccion["description"]
    assert data["amount"] == nueva_transaccion["amount"]
    assert data["category"] == nueva_transaccion["category"]
    
    # Verifica que la transacción se agregó a la lista
    assert len(transactions) == 1


def test_crear_transaccion_con_datos_invalidos():
    """
    Test 3: Verifica que el API maneje correctamente errores de validación
    cuando se envían datos inválidos o incompletos
    """
    # Intenta crear una transacción sin campos requeridos
    transaccion_invalida = {
        "date": "27-11-2025",
        # Falta descripcion, monto y categoria
    }
    
    response = client.post("/transactions/", json=transaccion_invalida)
    
    # Debe retornar un error de validación (422)
    assert response.status_code == 422
    
    # Verifica que no se agregó ninguna transacción
    assert len(transactions) == 0


def test_obtener_todas_las_transacciones():
    """
    Test 4: Verifica que se puedan obtener todas las transacciones
    """
    # Crea dos transacciones
    client.post("/transactions/", json={
        "date": "27-11-2025",
        "description": "Ingreso por salario",
        "amount": 3000.00,
        "category": "Salario"
    })
    
    client.post("/transactions/", json={
        "date": "27-11-2025",
        "description": "Pago de renta",
        "amount": -800.00,
        "category": "Otros"
    })
    
    # Obtiene todas las transacciones
    response = client.get("/transactions/")
    
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["amount"] == 3000.00
    assert data[1]["amount"] == -800.00


def test_resumen_transacciones():
    """
    Test 5: Verifica el cálculo del resumen de transacciones
    """
    # Crea transacciones con ingresos y gastos
    client.post("/transactions/", json={
        "date": "27-11-2025",
        "description": "Ingreso",
        "amount": 1000.00,
        "category": "Ventas"
    })
    
    client.post("/transactions/", json={
        "date": "27-11-2025",
        "description": "Gasto",
        "amount": -300.00,
        "category": "Otros"
    })
    
    response = client.get("/transactions/summary")
    
    assert response.status_code == 200
    data = response.json()
    assert data["total_income"] == 1000.00
    assert data["total_expense"] == -300.00
    assert data["net_total"] == 700.00
