from pydantic import BaseModel

#Schema de las transacciones
class Transaction(BaseModel):
    #Al crear una nueva transacción, el id es opcional
    id: int | None = None #Porque se genera automáticamente
    date: str
    description: str
    amount: float
    category: str