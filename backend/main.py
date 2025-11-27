import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from middlewares.error_handler import catch_exceptions_middleware,validation_exception_handler, http_exception_handler
from api import transaction


# Inicialización de la aplicación FastAPI
app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    # Permite todos los orígenes para evitar conflictos en la ejecución local
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Se incluyen los endpoints de las transacciones
app.include_router(transaction.router)

# Se agrega el middleware para el manejo de errores globales
app.middleware("http")(catch_exceptions_middleware)

# Se agregan los manejadores de excepciones personalizados
app.add_exception_handler(HTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)

# Endpoint para verificar el funcionamiento del servidor
@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok"}

# Ejecución de la aplicación.
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)