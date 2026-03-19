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
- `lib/reviews.ts`: resenas manuales usadas como fallback y como modo actual sin Google API
- `server.js`: servidor Node para despliegue en BanaHosting (Setup Node.js App)

## Variables de entorno

Crea `.env.local` a partir de `.env.example`:

```bash
cp .env.example .env.local
```

Variables:

- `APP_STAGE`: `staging` o `production`
- `SITE_URL`: URL publica actual de la app
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: numero WhatsApp con prefijo pais, sin `+`
- `NEXT_PUBLIC_WHATSAPP_TEXT`: texto URL encoded
- `NEXT_PUBLIC_PHONE_NUMBER`: telefono para enlace `tel:`
- `NEXT_PUBLIC_PHONE_DISPLAY`: telefono visible en la web
- `NEXT_PUBLIC_CLINIC_EMAIL`: email de contacto
- `GOOGLE_PLACES_API_KEY`: API key con Places API habilitada
- `GOOGLE_PLACE_ID`: Place ID de la clinica
- `REVIEWS_CACHE_TTL_HOURS`: horas de cache (6 recomendado)

Si no quieres activar todavia Google Places API, deja `GOOGLE_PLACES_API_KEY` y `GOOGLE_PLACE_ID`
sin configurar. En ese caso la web usara automaticamente las resenas manuales definidas en
`lib/reviews.ts`.

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

## Despliegue en BanaHosting sin SSH

Este hosting no permite SSH externo, asi que el flujo recomendado es:

1. generar la build en local
2. empaquetar un ZIP con solo lo necesario
3. subir ese ZIP por `File Manager` o `FTP`
4. extraerlo dentro de la carpeta de la app Node
5. reiniciar la app desde `Setup Node.js App`

### Generar paquete de despliegue

```bash
npm install
npm run deploy:package
```

Ese comando:

- ejecuta `npm run build`
- crea la carpeta `deploy/`
- genera un ZIP con timestamp listo para BanaHosting

Incluye solo:

- `.next/`
- `app/`
- `components/`
- `lib/`
- `public/`
- `package.json`
- `package-lock.json`
- `next.config.mjs`
- `server.js`
- `tsconfig.json`
- `next-env.d.ts`

No incluye:

- `node_modules/`
- `.git/`
- `.env*`
- caches locales que no hagan falta

### Pasos en BanaHosting

1. Abre `File Manager` o conecta por `FTP`.
2. Entra en la carpeta raiz de la app Node, por ejemplo `~/clinica-don-benito`.
3. Sube el ZIP generado en `deploy/`.
4. Extraelo dentro de esa carpeta, sobrescribiendo archivos.
5. En `Setup Node.js App`, pulsa `Restart`.

Si cambias dependencias en `package.json`, tendras que pedir a BanaHosting o usar el panel si lo permite para reinstalar dependencias dentro de la app. Si no cambian dependencias, normalmente basta con subir el nuevo ZIP y reiniciar.

### Configuracion exacta recomendada

Si quieres un staging rapido y todavia no vas a apuntar `clinicadentaldonbenito.com`, usa un subdominio de un dominio que ya tengas activo en ese cPanel.

Ejemplo:

- subdominio staging: `donbenito-staging.tu-dominio-actual.com`
- URL de la app: `/`
- URL publica resultante: `https://donbenito-staging.tu-dominio-actual.com`

Valores en `Setup Node.js App`:

- `Node.js version`: `18.x`
- `Application mode`: `Production`
- `Application root`: `clinica-don-benito`
- `Application URL`: `/`
- `Application startup file`: `server.js`

Variables de entorno minimas para staging:

- `APP_STAGE=staging`
- `SITE_URL=https://donbenito-staging.tu-dominio-actual.com`
- `NEXT_PUBLIC_WHATSAPP_NUMBER=34600000000`
- `NEXT_PUBLIC_WHATSAPP_TEXT=Hola%20quiero%20pedir%20una%20cita%20en%20Clinica%20Dental%20Don%20Benito`
- `NEXT_PUBLIC_PHONE_NUMBER=924857567`
- `NEXT_PUBLIC_PHONE_DISPLAY=924 857 567`
- `NEXT_PUBLIC_CLINIC_EMAIL=hola@clinicadentaldonbenito.es`
- `GOOGLE_PLACES_API_KEY=...`
- `GOOGLE_PLACE_ID=...`
- `REVIEWS_CACHE_TTL_HOURS=6`

Cuando llegue el momento de salir a dominio final:

- cambias el dominio de la app a `clinicadentaldonbenito.com`
- dejas `Application URL` en `/`
- cambias `APP_STAGE=production`
- cambias `SITE_URL=https://clinicadentaldonbenito.com`
- generas un ZIP nuevo con `npm run deploy:package`
- subes y extraes el ZIP en la app
- reinicias la app

## Estrategia recomendada de salida

1. Crear primero un subdominio privado de staging, por ejemplo `staging.tu-dominio.com`.
2. Desplegar ahi la app con `APP_STAGE=staging`.
3. Mantener staging fuera de indexacion:
   - la app envia `noindex` cuando `APP_STAGE` no es `production`
   - `robots.txt` bloquea rastreo fuera de produccion
   - aun asi, lo ideal es proteger staging con contrasena desde cPanel
4. Cuando el proyecto este validado:
   - apuntar `clinicadentaldonbenito.com`
   - cambiar `APP_STAGE=production`
   - cambiar `SITE_URL=https://clinicadentaldonbenito.com`
   - rebuild y restart

## Endpoints

- `GET /api/health`: estado basico del servicio
- `GET /api/reviews`: devuelve resenas de Google (con cache)
  Si falta configuracion de Google o hay error externo, responde fallback manual de forma segura.

## Nota sobre estructura antigua

Las carpetas `frontend/` y `backend/` se mantienen como referencia de la version previa.
