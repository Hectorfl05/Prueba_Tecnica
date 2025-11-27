FROM python:3.11-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los requerimientos e instala las dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código de la aplicación
COPY . .

# Expone el puerto 8000 (Cambiar si es necesario, preferiblemente no)
EXPOSE 8000

# Comando para ejecutar la aplicación con Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
