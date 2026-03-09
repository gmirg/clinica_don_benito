# Clinica Dental Don Benito - Next.js + TypeScript

Proyecto migrado a una sola aplicacion Next.js con TypeScript.

## Arquitectura

- `app/page.tsx`: one page principal
- `components/ReviewsSlider.tsx`: slider de resenas (cliente)
- `app/api/reviews/route.ts`: API para Google Reviews con cache en memoria
- `server.js`: servidor Node para despliegue en BanaHosting (Setup Node.js App)

## Variables de entorno

Crea `.env.local` a partir de `.env.example`:

```bash
cp .env.example .env.local
```

Variables:

- `NEXT_PUBLIC_WHATSAPP_NUMBER`: numero WhatsApp con prefijo pais, sin `+`
- `NEXT_PUBLIC_WHATSAPP_TEXT`: texto URL encoded
- `GOOGLE_PLACES_API_KEY`: API key con Places API habilitada
- `GOOGLE_PLACE_ID`: Place ID de la clinica
- `REVIEWS_CACHE_TTL_HOURS`: horas de cache (6 recomendado)

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Build y arranque en produccion

```bash
npm run build
npm run start
```

## Despliegue en BanaHosting (Node)

1. Subir proyecto al servidor (incluyendo `app`, `components`, `lib`, `public`, `package.json`, `server.js`).
2. En cPanel abrir `Setup Node.js App`.
3. Elegir version de Node compatible (20+ recomendado).
4. Seleccionar carpeta del proyecto.
5. Startup file: `server.js`.
6. Configurar variables de entorno.
7. Ejecutar instalacion de dependencias y luego `npm run build`.
8. Reiniciar la app Node.

## Endpoints

- `GET /api/health`: estado basico del servicio
- `GET /api/reviews`: devuelve resenas de Google (con cache)

## Nota sobre estructura antigua

Las carpetas `frontend/` y `backend/` se mantienen como referencia de la version previa.
