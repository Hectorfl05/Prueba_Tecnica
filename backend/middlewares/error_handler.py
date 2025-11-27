from fastapi import Request
from fastapi.responses import JSONResponse
import logging

# Configuración del logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def catch_exceptions_middleware(request: Request, call_next):
    """
    Middleware que intercepta las peticiones HTTP
    y maneja las excepciones de manera centralizada.
    """
    try:
        #1. Logueamos la llegada de la peticion
        logger.info(f"Iniciando petición: {request.method} {request.url}")
        #2. Procesamos la petición
        response = await call_next(request)

        #3. Logueamos la finalización de la petición y devolvemos la respuesta
        logger.info(f"Finalizando petición: {request.method} {request.url} - Status code: {response.status_code}")
        return response
    
    except Exception as e:
        #4. Manejo de excepciones
        logger.error(f"Error en la petición: {request.method} {request.url} - Error: {str(e)}")
        
        
        #Devolvemos una respuesta personalizada al cliente (frontend)
        return JSONResponse(
            status_code=500,
            content={"mensaje": f"Ocurrió un error interno en el servidor",
                     "error": f"{str(e)}",
                     "ruta": f"{request.url}"
                    }
        )

async def validation_exception_handler(request: Request, exc):
    """
    Maneja errores de validación de datos en las peticiones HTTP.
    """

    # Logueamos el error de validación
    logger.warning(f"Error de validación en la petición: {request.method} {request.url} - Error: {str(exc)}")
    
    # Devolvemos una respuesta personalizada al frontend
    return JSONResponse(
        status_code=422,
        content={
            "mensaje": "Error de validación de datos",
            "detalle": exc.errors() if hasattr(exc, 'errors') else str(exc)
        }
    )

async def http_exception_handler(request: Request, exc):
    """
    Maneja errores HTTP específicos.
    """
    # Logueamos el error HTTP
    logger.warning(f"HTTPException en la petición: {request.method} {request.url} - Error: {str(exc.detail)}")
    
    # Devolvemos una respuesta personalizada al frontend
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "mensaje": "Error HTTP",
            "detalle": exc.detail
        }
    )
