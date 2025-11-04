# Syneltec - Frontend (React + Vite)

Este repositorio contiene la aplicación frontend de Syneltec, construida con React y Vite. A continuación encontrarás un resumen técnico y de uso rápido del proyecto.

## Funcionalidades clave

- Autenticación: inicio de sesión (token JWT), persistencia en localStorage y control de sesión global mediante `AuthProvider`.
- Panel de administración (solo administradores): gestión completa (CRUD) de Productos y Usuarios.
- Catálogo público de Productos con listado y filtros mínimos.
- Formulario de productos con soporte para categorías (cargadas desde la API).
- Páginas públicas: Inicio, Servicios, Galería, Contacto y Sobre Nosotros.
- Rutas protegidas y renderizado condicional según rol (admin / usuario).

## Verbos HTTP usados

- GET: obtener listas y detalles (productos, categorías, usuarios).
- POST: crear recursos (login, crear producto, crear usuario).
- PUT: actualizar recursos (producto, usuario).
- DELETE: eliminar recursos (producto, usuario).

> En el frontend se usa `axios` para consumir la API y los hooks personalizados `useCrud` / `useFetchCategories` abstraen estas llamadas.

## Endpoints (configurados en `src/config/api.js`)

Las rutas se construyen a partir de la variable de entorno `VITE_REACT_APP_API_URL` + los endpoints listados abajo.

- Usuarios
	- GET    /users       -> Listar usuarios (requiere token/admin)
	- POST   /users       -> Crear usuario (admin)
	- PUT    /users/:id   -> Actualizar usuario (admin)
	- DELETE /users/:id   -> Eliminar usuario (admin)

- Productos
	- GET    /products    -> Listar productos
	- POST   /products    -> Crear producto (admin)
	- PUT    /products/:id-> Actualizar producto (admin)
	- DELETE /products/:id-> Eliminar producto (admin)

- Categorías
	- GET    /categories  -> Listar categorías

Ejemplo de construcción de URL en el código:
```js
import { buildApiUrl, API_CONFIG } from './src/config/api';
const url = buildApiUrl(API_CONFIG.PRODUCT.GET_ALL); // -> `${BASE_URL}/products`
```

## Modelos (resumen inferido del frontend)

- User
	- _id: string
	- name: string
	- email: string
	- role: string (ej. 'admin' o 'user')

- Product
	- _id: string
	- title: string
	- price: number
	- stock: number
	- category: { _id, name } | null
	- status: string (ej. 'AVAILABLE' | 'NOT AVAILABLE' | 'DISCONTINUED')

- Category
	- _id: string
	- name: string

> Nota: Los modelos están inferidos desde el uso en los componentes (`ProductList.jsx`, `UserList.jsx`, `ProductForm.jsx`). El contrato exacto lo define el backend.

## Tecnologías utilizadas

- React 18 + Vite
- React Router DOM
- Axios (consumo de API)
- Bootstrap 5 (estilos y componentes)
- ESLint (reglas y hooks checks)
- Hooks personalizados: `useCrud`, `useFetchCategories`, `useAuth` / `AuthProvider`

## Funcionalidades (detalladas)

- Autenticación
	- Inicio de sesión mediante POST `/auth/login` (token en localStorage).
	- `AuthProvider` valida el token al iniciar la app y provee `user`, `isAdmin`, `login`, `logout` y `loading`.

- Gestión de Productos (Admin)
	- Listado de productos público.
	- Formularios para crear/editar productos (incluye selección de categoría).
	- Borrado de productos con confirmación.

- Gestión de Usuarios (Admin)
	- Listado, creación, edición y eliminación de usuarios (solo admin).

- Otras páginas
	- Galería: muestra imágenes desde `src/assets/img`.
	- Contacto: formulario de contacto (componente `Contact.jsx`).

## Cómo ejecutar (desarrollo)

1. Copia `.env.example` a `.env` y ajusta `VITE_REACT_APP_API_URL` al backend.
2. Instala dependencias:
```powershell
npm install
```
3. Levanta la app en modo desarrollo (Vite):
```powershell
npm run dev
```

### Dependencias principales (si no están en package.json)

Si tu `package.json` no incluye alguna de las librerías usadas en el proyecto, instálalas con los siguientes comandos (PowerShell):

```powershell
# Dependencias de runtime
npm install bootstrap axios react-router-dom react-router-hash-link

# Dependencias de desarrollo (linters/build tools)
npm install -D eslint
```

Nota: `bootstrap` ya se importa en componentes concretos (por ejemplo `Login.jsx`) con `import 'bootstrap/dist/css/bootstrap.min.css';`. Si prefieres, puedes importarlo globalmente en `src/main.jsx`.

## Notas finales

- El frontend asume un backend RESTful con las rutas descritas. Para cambios en los endpoints, actualiza `src/config/api.js`.
- Si quieres, puedo generar una sección con ejemplos de request/response (curl / axios) para cada endpoint.

---

TPN2 - Syneltec (Frontend)
