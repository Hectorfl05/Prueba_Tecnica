# 📘 Guía de Ejecución – Aplicación Full-Stack (FastAPI + React + Docker)

En este documento se busca explicar cómo ejecutar el proyecto tanto en entorno local como en Docker.

## 📋 Descripción del Proyecto

El proyecto incluye:

- **Backend**: FastAPI (Python 3.11) con Uvicorn
- **Frontend**: React 18+ con TypeScript, Vite y Bootstrap 5 con estilo Material Design

---

## 🚀 1. Ejecución en Entorno Local (Sin Docker)

### 🟦 Backend (FastAPI)


#### 1️⃣ Acceder a la carpeta del backend

```bash
cd backend
```

#### 2️⃣ Crear un entorno virtual (recomendado)

```bash
python -m venv venv
```

#### 3️⃣ Activar el entorno virtual

**Windows (PowerShell):**

```powershell
.\venv\Scripts\Activate.ps1
```

**Windows (CMD):**

```cmd
venv\Scripts\activate.bat
```

**Linux / MacOS:**

```bash
source venv/bin/activate
```

#### 4️⃣ Instalar dependencias

```bash
pip install -r requirements.txt
```

#### 5️⃣ Ejecutar el servidor FastAPI

```bash
uvicorn main:app --reload
```

#### 📌 El backend estará disponible en:

- 👉 **API**: http://localhost:8000
- 👉 **Documentación (Swagger)**: http://localhost:8000/docs
- 👉 **Redoc**: http://localhost:8000/redoc

---

### 🟩 Frontend (React + Vite)

#### 1️⃣ Acceder a la carpeta del frontend

```bash
cd frontend
```

#### 2️⃣ Instalar dependencias

```bash
npm install
```

#### 3️⃣ Levantar el servidor de desarrollo

```bash
npm run dev
```

#### 📌 El frontend estará disponible en:

- 👉 **Aplicación**: http://localhost:5173

---

## 🐳 2. Ejecución con Docker Compose

### 1️⃣ Requisitos previos

- **Docker Desktop** instalado y ejecutándose
  - 📥 [Descargar Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 2️⃣ Construir los contenedores

Desde la **carpeta raíz del proyecto**, ejecuta:

```bash
docker compose build
```

### 3️⃣ Levantar los servicios

```bash
docker compose up -d
```

El flag `-d` ejecuta los contenedores en segundo plano (modo detached).

### 4️⃣ Acceder a los servicios

- 👉 **Frontend**: http://localhost:3000
- 👉 **Backend API**: http://localhost:8000
- 👉 **Backend Docs (Swagger)**: http://localhost:8000/docs

### 5️⃣ Ver logs de los contenedores

```bash
docker compose logs -f
```

Para ver logs de un servicio específico:

```bash
docker compose logs -f backend
docker compose logs -f frontend
```

### 6️⃣ Detener los servicios

```bash
docker compose down
```

Para eliminar también los volúmenes:

```bash
docker compose down -v
```

### 📌 Notas importantes

- Los contenedores se construyen automáticamente desde la carpeta raíz del proyecto usando el archivo `docker-compose.yml`.

- **Cambiar puertos locales**: Si necesitas modificar los puertos, edita el archivo `docker-compose.yml` y cambia **únicamente el puerto del host** (antes de los dos puntos) en las secciones `ports`:

  ```yaml
  # Frontend
  ports:
    - "3000:80"  # Cambia el 3000 por el puerto deseado

  # Backend
  ports:
    - "8000:8000"  # Cambia el primer 8000 por el puerto deseado
  ```

- **Hot Reload**: El backend incluye el flag `--reload` para desarrollo, por lo que los cambios en el código se reflejarán automáticamente sin necesidad de reconstruir el contenedor.

---

## 🎨 Tecnologías Utilizadas

### Backend

- **FastAPI** - Framework web moderno y rápido
- **Python 3.11** - Lenguaje de programación
- **Uvicorn** - Servidor ASGI de alto rendimiento
- **Pydantic** - Validación de datos

### Frontend

- **React 18+** con TypeScript - Biblioteca de interfaz de usuario
- **Vite 7.2.4** - Build tool y dev server de última generación
- **Bootstrap 5.3.8** - Framework CSS para diseño responsive

---

## 📦 Requisitos Generales

### ✔️ Para ejecución local:

| Herramienta | Versión Mínima |
| ----------- | -------------- |
| Python      | 3.10+          |
| Node.js     | 18+            |
| npm         | 9+             |
| pip         | 23+            |

### ✔️ Para ejecución con Docker:

| Herramienta    | Versión Mínima |
| -------------- | -------------- |
| Docker Desktop | 20+            |
| Docker Compose | 2.0+           |

---

## 🧱 Estructura del Proyecto

```
Plantilla_Prueba_Tecnica/
├── backend/
│   ├── main.py                 # Punto de entrada de la API
│   ├── requirements.txt        # Dependencias de Python
│   ├── Dockerfile             # Imagen Docker del backend
│   ├── api/                   # Rutas de la API
│   ├── controllers/           # Lógica de negocio
│   ├── models/                # Modelos de datos
│   ├── schemas/               # Esquemas Pydantic
│   └── middlewares/           # Middlewares personalizados
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx           # Componente principal
│   │   ├── main.tsx          # Punto de entrada
│   │   ├── components/       # Componentes reutilizables
│   │   ├── pages/            # Páginas de la aplicación
│   │   └── config/           # Configuración (API endpoints)
│   ├── public/               # Recursos estáticos
│   ├── package.json          # Dependencias de Node.js
│   ├── Dockerfile           # Imagen Docker del frontend
│   └── vite.config.ts       # Configuración de Vite
│
├── docker-compose.yml        # Orquestación de contenedores
└── README.md                # Este archivo
```

---

## 🎯 Comandos Útiles

### Docker Compose

```bash
# Construir imágenes
docker compose build

# Levantar servicios en segundo plano
docker compose up -d

# Ver logs en tiempo real
docker compose logs -f

# Reiniciar un servicio específico
docker compose restart backend
docker compose restart frontend

# Ver estado de los contenedores
docker compose ps

# Detener servicios
docker compose stop

# Detener y eliminar contenedores
docker compose down

# Detener, eliminar contenedores y volúmenes
docker compose down -v
```

### Backend Local

```bash
# Activar entorno virtual
.\venv\Scripts\Activate.ps1  # Windows PowerShell
source venv/bin/activate      # Linux/Mac

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar servidor con hot reload
uvicorn main:app --reload

# Ejecutar en un puerto diferente
uvicorn main:app --reload --port 8080
```

### Frontend Local

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

---

## 🎯 Notas Finales

- ✅ Este proyecto está diseñado para ejecutarse tanto de manera **local** como dentro de **contenedores Docker**.
- ✅ La interfaz utiliza **Material Design** con Bootstrap 5 para una experiencia visual moderna.
- ✅ El backend incluye **documentación interactiva** automática con Swagger UI.


