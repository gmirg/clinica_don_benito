# Clinica Dental Don Benito - Next.js + TypeScript

Proyecto migrado a una sola aplicacion Next.js con TypeScript.

## Secciones de la one-page

- Portada
- Servicios
- Sobre nosotras
- Filosofia y valores
- Contacto

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
- `NEXT_PUBLIC_PHONE_NUMBER`: telefono para enlace `tel:`
- `NEXT_PUBLIC_PHONE_DISPLAY`: telefono visible en la web
- `NEXT_PUBLIC_CLINIC_EMAIL`: email de contacto
- `GOOGLE_PLACES_API_KEY`: API key con Places API habilitada
- `GOOGLE_PLACE_ID`: Place ID de la clinica
- `REVIEWS_CACHE_TTL_HOURS`: horas de cache (6 recomendado)

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:3001`.

El script `npm run dev` ya usa el puerto `3001` por defecto.
En desarrollo usa `next dev` (Webpack) para mayor estabilidad con hot-reload y limpia
automaticamente caches locales (`.next-dev` y `.next`) al arrancar.
Si necesitas otro puerto puntualmente:

```bash
npm run dev -- -p 3002
```

Si en desarrollo aparece un error `ENOENT` dentro de `.next-dev/server/.../app-build-manifest.json`
(o en `.next/server/...` de una sesion anterior):

```bash
npm run dev
```

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
  Si falta configuracion de Google o hay error externo, responde fallback de forma segura.

## Nota sobre estructura antigua

Las carpetas `frontend/` y `backend/` se mantienen como referencia de la version previa.
