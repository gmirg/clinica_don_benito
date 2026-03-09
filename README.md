# Clinica Dental Don Benito - One Page React + Node

Proyecto preparado para BanaHosting con arquitectura hibrida:

- `frontend/`: React + Vite (sitio estatico)
- `backend/`: Node + Express (API de resenas de Google con cache)

## Desarrollo local

Terminal 1:

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Terminal 2:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## 1) Frontend (React)

```bash
cd frontend
cp .env.example .env
npm install
npm run build
```

Variables (`frontend/.env`):

- `VITE_API_BASE_URL` -> URL publica del backend (`https://api.tudominio.com` o similar)
- `VITE_WHATSAPP_NUMBER` -> numero con prefijo pais, sin `+`
- `VITE_WHATSAPP_TEXT` -> texto URL encoded

Salida de build:

- `frontend/dist`

Sube el contenido de `dist` a `public_html`.

## 2) Backend (Node)

```bash
cd backend
cp .env.example .env
npm install
npm run start
```

Variables (`backend/.env`):

- `PORT` -> puerto de la app Node (el que configure BanaHosting)
- `CORS_ORIGIN` -> dominio del frontend, ej: `https://tudominio.com`
- `GOOGLE_PLACES_API_KEY` -> API key con Places API habilitada
- `GOOGLE_PLACE_ID` -> Place ID de la clinica
- `REVIEWS_CACHE_TTL_HOURS` -> horas de cache (6 recomendado)

Endpoints:

- `GET /api/health`
- `GET /api/reviews`

## 3) Configuracion en BanaHosting

### Frontend estatico

1. Genera `frontend/dist`.
2. Sube el contenido a `public_html`.

### Backend Node

1. En cPanel usa `Setup Node.js App`.
2. Selecciona la carpeta `backend`.
3. Define startup file: `src/server.js`.
4. Carga variables de entorno del backend.
5. Instala dependencias y reinicia la app.

Si frontend y backend no comparten dominio/subdominio, ajusta `CORS_ORIGIN`.

## 4) Obtener Google Place ID

Opcion rapida: usa Place ID Finder de Google Maps Platform y copia el id del negocio.

## 5) Notas

- El backend cachea resenas para reducir consumo de cuota en Google.
- Si falla la API, el frontend muestra resenas fallback para no romper el slider.
